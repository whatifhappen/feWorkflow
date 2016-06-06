import { combineReducers } from 'redux';
import lists from './list';
import container from './container';
import snackbar from './snackbar';
import dropzone from './dropzone';

export default combineReducers({
  lists,
  container,
  snackbar,
  dropzone
});
