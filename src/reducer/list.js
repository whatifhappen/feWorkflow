import { List, Map } from 'immutable';
import { btnsList } from './list-btns';
import { operationBtns } from './list-operation';

const initState = List([]);

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return state.push(
        Map({
          id: action.id,
          name: action.name,
          status: '',
          location: action.location,
          btns: btnsList,
          showOperation: false,
          operationBtns,
          url: ''
        }
      ));

    case 'DELETE_LIST':
      return state.filter(item => item.get('id') !== action.id);

    case 'PROCESSING':
      return state.map(item => {
        if (item.get('id') == action.id) {
          return item.withMutations(i => {
            i
              .set('status', action.btns.cmd)
              .set('snackbar', action.snackbar)
              .setIn(['btns', action.btns.index, 'text'], action.btns.name)
              .setIn(['btns', action.btns.index, 'name'], '编译中...')
              .setIn(['btns', action.btns.index, 'process'], action.btns.process)
              .setIn(['btns', action.btns.index, 'pid'], action.btns.pid);
          });

        } else {
          return item;
        }
      });

    case 'CANCEL_BUILD':
      return state.map(item => {
        if (item.get('id') == action.id) {
          return item.withMutations(i => {
            i
              .setIn(['btns', action.btns.index, 'process'], action.btns.process)
              .setIn(['btns', action.btns.index, 'name'], action.btns.text)
              .setIn(['btns', action.btns.index, 'text'], '编译中...')
              .setIn(['btns', action.btns.index, 'fail'], action.btns.fail)
              .setIn(['btns', action.btns.index, 'pid'], action.btns.pid);
          });
        } else {
          return item;
        }
      });

    case 'SET_EXTERNAL_URL':
      return state.map(item => {
        if (item.get('id') == action.id) {
          return item.set('url', action.url);
        } else {
          return item;
        }
      });

    case 'TOGGLE_SNACKBAR':
      return state.map(item => {
        if (item.get('id') == action.id) {
          return item.set('snackbar', action.snackbar);
        } else {
          return item;
        }
      });

    case 'TOGGLE_LIST_HOVER_STATE':
      return state.map((item) => {
        if (item.get('id') == action.id) {
          return item.set('showOperation', action.showOperation);
        } else {
          return item;
        }
      });

    default:
      return state;
  }
}
