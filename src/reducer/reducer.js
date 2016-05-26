import { combineReducers } from 'redux';
import reducerListBtn from './list-btns';
import reducerList from './list';

export default combineReducers({
  reducerList,
  reducerListBtn
});
