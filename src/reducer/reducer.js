import { combineReducers } from 'redux';
import lists from './list';
import container from './container';
import snackbar from './snackbar';

export default combineReducers({
  lists,
  container,
  snackbar
});
