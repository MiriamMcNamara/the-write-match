import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchSelected( action ) {
  try {
    
    const response = yield axios.get(`/api/selected/${action.payload}`);

    yield put({ type: 'SET_SELECTED', payload: response.data });
  } catch (error) {
    console.log('writer get request failed', error);
  }
}

function* deleteSelected( action ) {
  try {
  const response = yield axios.delete(`/api/selected/${action.payload}`);

  yield put({ type: 'SET_SELECTED', payload: response.data });
  } catch (error) {
  console.log('writer get request failed', error);
}
}

function* selectedSaga() {
  yield takeLatest('FETCH_SELECTED', fetchSelected);
  yield takeLatest('DELETE_SELECTED', deleteSelected);
}

export default selectedSaga;
