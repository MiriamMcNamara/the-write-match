import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchWriter( action ) {
  try {
    
    const response = yield axios.get(`/api/writer/${action.payload}`);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_WRITER', payload: response.data });
  } catch (error) {
    console.log('writer get request failed', error);
  }
}

function* postWriter( action ) {
  console.log( '--------> in postWriter', action.payload );
  try {
      const response = yield axios.post('/api/writer', action.payload);
      console.log( 'adding writer: ', response.data );
      yield put( { type: 'FETCH_WRITER', payload: response.data } );
      alert( 'writer saved!' );
  } catch( err ){
      alert( 'no' );
      console.log( err );
    }
}

function* writerSaga() {
  yield takeLatest('FETCH_WRITER', fetchWriter);
  yield takeLatest('POST_WRITER', postWriter);
}

export default writerSaga;
