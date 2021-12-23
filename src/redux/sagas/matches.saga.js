import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions


function* filterMatches( action) {
  console.log( 'in filterMatches' );
    try {
      //this will need to send data once I flesh it out but this works for now
      const matches = yield axios.get(`/api/matches/?writer=${action.payload.writer}&seeking=${action.payload.seeking}&availablefor=${action.payload.availablefor}`);
      try {
    
        const selected = yield axios.get(`/api/selected/${action.payload.user}`);
        console.log( matches.data );
        console.log( selected.data );
        let matchesArray=[];
        for ( let i=0; i<matches.data.length; i++){
          console.log( 'in loop' );
          for (let j=0; j<selected.data.length; j++){
            if (matches.data[i].id != selected.data[j].approver_id 
              // ||
              // (matches.data[i].id != selected.data[j].initiator_id 
              // && selected.data[j].approver_id != action.payload.writer)
              ){
                console.log( 'in loop' );
                matchesArray.push(matches.data[i])
              }//end if statement
          }//end j loop
        }//end i loop
        console.log( 'matches array:', matchesArray );
        //create an array
        //loop thru both response arrays. if matches.data[i].id != selected.data[j].approver_id
        //OR if matches.data[i].id != selected.data[j].initiator_id && selected.data[j].approver_id != action.payload.writer
        //push it into the NEW array and use that to fill the matches store

        //use the selected.data to fill the selected store, still
       
      } catch (error) {
        console.log('writer get request failed', error);
      }
      
    } catch (error) {
      console.log('matches get request failed', error);
    }

}

function* checkMatches( action ) {
  try {
    const response = yield axios.get(`/api/matches/existing/?initiator=${ action.payload.initiator }&approver=${action.payload.approver}` );
    //if response.data is empty, run postMatch;
    //else, run confirmMatch;
    if ( response.data.length ===0){
      console.log( 'in IF----------->', response.data );
      yield put({ type: 'POST_MATCH', payload: action.payload })
    }
    else {
      console.log( 'in ELSE----------->', response.data );
      yield put({ type: 'CONFIRM_MATCH', payload: action.payload });
    }

    // yield put({ type: 'SET_EXISTING', payload: response.data });
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
  // yield takeLatest('FETCH_MATCHES', fetchMatches);
  yield takeLatest('CHECK_MATCHES', checkMatches);
  yield takeLatest('POST_MATCH', postMatch);
  yield takeLatest('CONFIRM_MATCH', confirmMatch);
  yield takeLatest('FILTER_MATCHES', filterMatches);
}

export default matchesSaga;
