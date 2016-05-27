import { combineReducers } from 'redux';
import listBtns from './list-btns';
import lists from './list';
import container from './container';

export default combineReducers({
  lists,
  listBtns,
  container
});
