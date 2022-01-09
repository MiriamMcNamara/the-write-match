import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* filterMatches(action) {
  //this function gets both the potential writer matches for the user from the writer.router,
  //and the already-selected matches for the user from the selected.router.
  //this is definitely the most bananas bit of javascript logic i've written to date!
  //so I'm gonna leave all the console logs for future reference
  try {
    const matches = yield axios.get(
      `/api/matches/?writer=${action.payload.writer}&seeking=${action.payload.seeking}&availablefor=${action.payload.availablefor}`
    );
    try {
      const selected = yield axios.get(
        `/api/selected/${action.payload.writer}`
      );
      console.log(matches.data);
      console.log(selected.data);
      //create an empty array
      let matchesArray = [];
      // if the selected array is NOT empty, run a loop within a loop that checks
      //each object in the matches array against the objects in the selected array
      if (selected.data.length > 0) {
        for (let i = 0; i < matches.data.length; i++) {
          //create a boolean set to false
          let hasMatches = false;
          for (let j = 0; j < selected.data.length; j++) {
            if (matches.data[i].id == selected.data[j].approver_id) {
              //if the potential match has already approved a match initiated by the user,
              //flip the boolean to true
              hasMatches = true;
              console.log(
                "in loop, my potential match is",
                matches.data[i].id,
                "my selected match is",
                selected.data[j].approver_id,
                "so hasMatches turned true"
              );
            } //end if statement
            else if (
              //if the potential match has initiated a match with the user,
              //and the match has already been confirmed by the user, flip the boolean to true
              matches.data[i].id == selected.data[j].initiator_id &&
              selected.data[j].confirmed == true
            ) {
              hasMatches = true;
              console.log(
                "in loop, my potential match is",
                matches.data[i].id,
                "my selected match is",
                selected.data[j].initiator_id,
                "and selected.data[j].confirmed==",
                selected.data[j].confirmed,
                "so hasMatches turned true"
              );
            } //end if statement
            else {
              console.log(
                "in loop, my potential match is",
                matches.data[i].id,
                "my selected match is",
                selected.data[j].approver_id,
                "so hasMatches remains false"
              );
            }
          } //end j loop
          //if the boolean has not been flipped by either of these cases,
          //push the match into the matchesArray
          if (hasMatches == false) {
            matchesArray.push(matches.data[i]);
          }
        } //end i loop
      } //end other if
      //if the selected array is empty, you can go ahead and just return the whole matches.data
      //no need for the loops to filter it
      else {
        matchesArray = matches.data;
      }
      // then set your matches reducer with the matchesArray and the selected reducer with the
      //selected.data (this isn't altered by the above filtering situation)
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
  //this function checks if there is already a match (initiated by another user) before
  //initiating EITHER the POST or PUT route in the matches.router
  try {
    const response = yield axios.get(
      `/api/matches/existing/?initiator=${action.payload.initiator}&approver=${action.payload.approver}`
    );
    //if response.data is empty, run postMatch;
    //else, run confirmMatch;
    if (response.data.length === 0) {
      yield put({ type: "POST_MATCH", payload: action.payload });
    } else {
      yield put({ type: "CONFIRM_MATCH", payload: action.payload });
    }
    //then you have to run filter matches again because both reducers need to be updated
    yield put({ type: "FILTER_MATCHES", payload: action.payload });
  } catch (error) {
    console.log("existing matches get request failed", error);
  }
}

function* confirmMatch(action) {
  //simple little boolean flip in the database triggered by the checkMatches Saga
  try {
    const response = yield axios.put("/api/matches/", action.payload);
  } catch (error) {
    console.log("writer put request failed", error);
  }
}

function* postMatch(action) {
  //this posts a new match to the matches table in the database if one does not already
  //exists between the two users involved
  try {
    const response = yield axios.post("/api/matches", action.payload);
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* deleteSelected(action) {
  //triggered by button click in SelectedMatchesItem; deletes the match from the matches table
  try {
    const response = yield axios.delete(
      `/api/selected/${action.payload.match}`
    );

    yield put({ type: "FILTER_MATCHES", payload: action.payload });
  } catch (error) {
    console.log("delete selected request failed", error);
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
