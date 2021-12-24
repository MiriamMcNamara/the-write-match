import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* filterMatches(action) {
  console.log("in filterMatches");
  try {
    const matches = yield axios.get(
      `/api/matches/?writer=${action.payload.writer}&seeking=${action.payload.seeking}&availablefor=${action.payload.availablefor}`
    );
    try {
      const selected = yield axios.get(`/api/selected/${action.payload.user}`);
      console.log(matches.data);
      console.log(selected.data);
      let matchesArray = [];
      if( selected.data.length>0){
      for (let i = 0; i < matches.data.length; i++) {
        console.log("in loop");
        let hasMatches = false;
        for (let j = 0; j < selected.data.length; j++) {
          if (
            matches.data[i].id == selected.data[j].approver_id
          ) {
            hasMatches = true;
            console.log("in loop, my potential match is", matches.data[i].id, 'my selected match is', selected.data[j].approver_id, 'so hasMatches turned true' );
          } //end if statement
          else{ console.log("in loop, my potential match is", matches.data[i].id, 'my selected match is', selected.data[j].approver_id, 'so hasMatches remains false') }
        } //end j loop
        if (hasMatches == false){ matchesArray.push(matches.data[i])};
      } //end i loop
    }//end other if
    else{
      matchesArray=matches.data;
    }
      console.log("matches array:", matchesArray);
      yield put({ type: "SET_MATCHES", payload: matchesArray });
      yield put({ type: "SET_SELECTED", payload: selected.data });
    } catch (error) {
      console.log("writer get request failed", error);
    }
  } catch (error) {
    console.log("matches get request failed", error);
  }
}

function* checkMatches(action) {
  try {
    const response = yield axios.get(
      `/api/matches/existing/?initiator=${action.payload.initiator}&approver=${action.payload.approver}`
    );
    //if response.data is empty, run postMatch;
    //else, run confirmMatch;
    if (response.data.length === 0) {
      console.log("in IF----------->", response.data);
      yield put({ type: "POST_MATCH", payload: action.payload });
    } else {
      console.log("in ELSE----------->", response.data);
      yield put({ type: "CONFIRM_MATCH", payload: action.payload });
    }
  } catch (error) {
    console.log("existing matches get request failed", error);
  }
}

function* confirmMatch(action) {
  try {
    const response = yield axios.put(
      `/api/matches/${action.payload.initiator}`
    );
    yield put({ type: "SET_MATCHES", payload: response.data });
    yield put({ type: "FETCH_MATCHES" });
  } catch (error) {
    console.log("writer put request failed", error);
  }
}

function* postMatch(action) {
  console.log("--------> in postMatch", action.payload);
  try {
    const response = yield axios.post("/api/matches", action.payload);
    console.log("adding match: ", response.data);
    yield put({ type: "FETCH_MATCHES" });
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* deleteSelected(action) {
  try {
    const response = yield axios.delete(`/api/selected/${action.payload}`);

    yield put({ type: "SET_SELECTED", payload: response.data });
  } catch (error) {
    console.log("writer get request failed", error);
  }
}

function* matchesSaga() {
  yield takeLatest("CHECK_MATCHES", checkMatches);
  yield takeLatest("POST_MATCH", postMatch);
  yield takeLatest("CONFIRM_MATCH", confirmMatch);
  yield takeLatest("FILTER_MATCHES", filterMatches);
  yield takeLatest("DELETE_SELECTED", deleteSelected);
}

export default matchesSaga;
