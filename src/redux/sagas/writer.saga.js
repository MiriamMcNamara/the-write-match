import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchWriter(action) {
  //this function gets the writer profile info for the user that is logged in.
  //different action.payloads are sent depending on whether this is triggered by the postWriter
  //function in CreateProfile or the dispatch in ViewProfile, so I had to declare a
  //variable and set it depending on what action.payload comes through
  let userinfo = action.payload.user_id;
  if (userinfo == null) {
    userinfo = action.payload;
  }
  try {
    const response = yield axios.get(`/api/writer/${userinfo}`);
    yield put({ type: "SET_WRITER", payload: response.data });
  } catch (error) {
    console.log("writer get request failed", error);
  }
}

function* fetchSeeking(action) {
  //a separate function to get and set the seeking info for the user
  try {
    const response = yield axios.get(`/api/writer/seeking/${action.payload}`);
    yield put({ type: "SET_SEEKING", payload: response.data });
  } catch (error) {
    console.log("writer get request failed", error);
  }
}

function* fetchAvailableFor(action) {
  //a separate function to get and set the availableFor info for the user
  try {
    const response = yield axios.get(
      `/api/writer/availablefor/${action.payload}`
    );
    yield put({ type: "SET_AVAILABLE_FOR", payload: response.data });
  } catch (error) {
    console.log("writer get request failed", error);
  }
}

function* postWriter(action) {
  //this function adds a new user's profile to the writer table in the database and triggers
  //the fetchWriter function above
  try {
    const response = yield axios.post("/api/writer", action.payload);
    yield put({ type: "FETCH_WRITER", payload: action.payload });
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* updateWriter(action) {
  console.log("in updateWriter saga", action);
  try {
    const response = yield axios.put(
      `/api/writer/${action.writer_id}`,
      action.payload
    );
    yield put({ type: "FETCH_WRITER", payload: action.payload.user_id });
  } catch (error) {
    console.log("writer put request failed", error);
  }
}

function* updateSeeking(action) {
  console.log("in updateSeeking saga");
  try {
    const response = yield axios.put(
      `/api/writer/seeking/${action.writer_id}`,
      action.payload
    );
    yield put({ type: "FETCH_SEEKING", payload: action.payload.user_id });
  } catch (error) {
    console.log("seeking put request failed", error);
  }
}

function* updateAvailableFor(action) {
  console.log("in updateAvailableFor saga");
  try {
    const response = yield axios.put(
      `/api/writer/availablefor/${action.writer_id}`,
      action.payload
    );
    yield put({ type: "FETCH_AVAILABLE_FOR", payload: action.payload.user_id });
  } catch (error) {
    console.log("availablefor put request failed", error);
  }
}

function* writerSaga() {
  yield takeLatest("FETCH_WRITER", fetchWriter);
  yield takeLatest("POST_WRITER", postWriter);
  yield takeLatest("FETCH_SEEKING", fetchSeeking);
  yield takeLatest("FETCH_AVAILABLE_FOR", fetchAvailableFor);
  yield takeLatest("UPDATE_WRITER", updateWriter);
  yield takeLatest("UPDATE_SEEKING", updateSeeking);
  yield takeLatest("UPDATE_AVAILABLE_FOR", updateAvailableFor);
}

export default writerSaga;
