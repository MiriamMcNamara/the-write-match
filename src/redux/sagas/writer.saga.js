import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchWriter( action ) {
  try {
    
    const response = yield axios.get(`/api/writer/${action.payload}`);
    yield put({ type: 'SET_WRITER', payload: response.data });
  } catch (error) {
    console.log('writer get request failed', error);
  }
}

function* fetchGenre( action ) {
  try {
    
    const response = yield axios.get(`/api/writer/genre/${action.payload}`);
    yield put({ type: 'SET_GENRE', payload: response.data });
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
  } catch( err ){
      alert( 'no' );
      console.log( err );
    }
}

function* writerSaga() {
  yield takeLatest('FETCH_WRITER', fetchWriter);
  yield takeLatest('POST_WRITER', postWriter);
  yield takeLatest('FETCH_GENRE', fetchGenre);
}

export default writerSaga;
