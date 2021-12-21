import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import writer from './writer.reducer';
import matches from './matches.reducer';
import selected from './selected.reducer';
import genre from './genre.reducer';
import seeking from './seeking.reducer';
import availablefor from './availablefor.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  writer, //contains other info about writer that is logged in
  matches, //contains an array of matches for the writer that is logged in
  selected, //contains an array of selected matches for the writer that is logged in
  genre, //contains an array of genres for the writer that is logged in
  seeking, //contains an array of seeking for the writer that is logged in
  availablefor //contains an array of availablefor for the writer that is logged in
});

export default rootReducer;
