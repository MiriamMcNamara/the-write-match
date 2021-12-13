import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchWriter() {
  try {
    
    const response = yield axios.get('/api/writer');

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_WRITER', payload: response.data });
  } catch (error) {
    console.log('writer get request failed', error);
  }
}

function* writerSaga() {
  yield takeLatest('FETCH_WRITER', fetchWriter);
}

export default writerSaga;
