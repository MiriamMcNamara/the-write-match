import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchWriter( action ) {
  try {
    
    const response = yield axios.get(`/api/writer/${action.payload}`);
    yield put({ type: 'SET_WRITER', payload: response.data });
  } catch (error) {
    console.log('writer get request failed', error);
  } 
}

function* fetchSeeking( action ) {
  try {
    
    const response = yield axios.get(`/api/writer/seeking/${action.payload}`);
    yield put({ type: 'SET_SEEKING', payload: response.data });
  } catch (error) {
    console.log('writer get request failed', error);
  }
}

function* fetchAvailableFor( action ) {
  try {
    
    const response = yield axios.get(`/api/writer/availablefor/${action.payload}`);
    yield put({ type: 'SET_AVAILABLE_FOR', payload: response.data });
  } catch (error) {
    console.log('writer get request failed', error);
  }
}

function* postWriter( action ) {
  console.log( '--------> in postWriter', action.payload );
  try {
      const response = yield axios.post('/api/writer', action.payload);
      console.log( 'adding writer: ', response.data );
      yield put( { type: 'FETCH_WRITER', payload: action.payload } );
  } catch( err ){
      alert( 'no' );
      console.log( err );
    }
}

function* writerSaga() {
  yield takeLatest('FETCH_WRITER', fetchWriter);
  yield takeLatest('POST_WRITER', postWriter);
  yield takeLatest('FETCH_SEEKING', fetchSeeking);
  yield takeLatest('FETCH_AVAILABLE_FOR', fetchAvailableFor);
}

export default writerSaga;
