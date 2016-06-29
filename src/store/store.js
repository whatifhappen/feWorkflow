import { createStore } from 'redux';
import reducer from '../reducer/reducer';
import { loadState, saveState } from '../action/task/localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const persistedListsState = loadState('lists');

const store = createStore(
  reducer,
  {
    setting: persistedState,
    lists: persistedListsState
  }
);

store.subscribe(throttle(() => {
  saveState('lists', store.getState().lists);
  saveState('setting', store.getState().setting);
}, 1500));

export default store;
