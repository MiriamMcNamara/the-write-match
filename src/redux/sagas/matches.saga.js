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
  yield takeLatest('POST_MATCH', postMatch);
}

export default matchesSaga;
