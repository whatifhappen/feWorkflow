import { combineReducers } from 'redux';
import listBtns from './list-btns';
import lists from './list';

export default combineReducers({
  lists,
  listBtns
});
