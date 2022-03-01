import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* sendEmail(action) {
  console.log("action.payload:", action.payload);
  try {
    const response = yield axios.post("/api/mail", action.payload);
  } catch (err) {
    alert("no in sendEmail");
    console.log("error posting email:", err);
  }
}

function* emailSaga() {
  yield takeLatest("SEND_EMAIL", sendEmail);
}

export default emailSaga;
