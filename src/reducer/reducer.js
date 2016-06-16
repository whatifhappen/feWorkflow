import { combineReducers } from 'redux';
import lists from './list';
import snackbar from './snackbar';
import dropzone from './dropzone';
import operationBtns from './list-operations';

export default combineReducers({
  lists,
  snackbar,
  dropzone,
  operationBtns
});
