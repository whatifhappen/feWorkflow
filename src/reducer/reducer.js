import { combineReducers } from 'redux';
import { reducerListBtn } from './reducer-list-btns';
import { reducerList } from './reducer-list';

export default combineReducer({
  reducerList,
  reducerListBtn
});
