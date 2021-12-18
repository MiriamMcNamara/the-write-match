import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchMatches( action ) {
  try {
    //this will need to send data once I flesh it out but this works for now
    const response = yield axios.get(`/api/matches/`);
    yield put({ type: 'SET_MATCHES', payload: response.data });
  } catch (error) {
    console.log('matches get request failed', error);
  }
}

function* checkMatches( action ) {
  try {
    const response = yield axios.get(`/api/matches/existing/?initiator=${ action.payload.initiator }&approver=${action.payload.approver}` );
    //if response.data is empty, run postMatch;
    //else, run confirmMatch;
    if ( response.data ===[]){
      yield put({ type: 'POST_MATCH', payload: action.payload })
    }
    else {
      yield put({ type: 'CONFIRM_MATCH', payload: action.payload });
    }

    // yield put({ type: 'SET_EXISTING', payload: response.data });
    console.log( '----------->', response.data );
  } catch (error) {
    console.log('existing matches get request failed', error);
  }

}

function* confirmMatch ( action ) {
  try {
    const response = yield axios.put(`/api/matches/${action.payload.initiator}`);
    yield put({ type: 'SET_MATCHES', payload: response.data });
    yield put( { type: 'FETCH_MATCHES' } );
    } catch (error) {
    console.log('writer put request failed', error);
  }
}

function* postMatch( action ) {
  console.log( '--------> in postMatch', action.payload );
  try {
      const response = yield axios.post('/api/matches', action.payload);
      console.log( 'adding match: ', response.data );
      yield put( { type: 'FETCH_MATCHES' } ); 
  } catch( err ){
      alert( 'no' );
      console.log( err );
    }
}

function* matchesSaga() {
  yield takeLatest('FETCH_MATCHES', fetchMatches);
  yield takeLatest('CHECK_MATCHES', checkMatches);
  yield takeLatest('POST_MATCH', postMatch);
  yield takeLatest('CONFIRM_MATCH', confirmMatch);
}

export default matchesSaga;
