import { combineReducers } from 'redux';
import lists from './list';
import snackbar from './snackbar';
import dropzone from './dropzone';
import setting from './setting';

export default combineReducers({
  lists,
  snackbar,
  dropzone,
  setting
});
