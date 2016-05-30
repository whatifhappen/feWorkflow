import { combineReducers } from 'redux';
import lists from './list';
import container from './container';

export default combineReducers({
  lists,
  container
});
