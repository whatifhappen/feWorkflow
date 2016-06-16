import { List, Map } from 'immutable';

const btnsList = List([
  Map({
    index: 0,
    type: 'WAIT',
    name: '开发',
    cmd: 'dev',
    flag: '--development',
    process: false,
    fail: false,
    pid: null
  }),
  Map({
    index: 1,
    type: 'WAIT',
    name: '压缩',
    cmd: '',
    flag: '--production',
    process: false,
    fail: false,
    pid: null
  }),
  // Map({
  //   index: 2,
  //   type: 'WAIT',
  //   name: 'FTP',
  //   cmd: 'ftp',
  //   flag: '',
  //   process: false,
  //   fail: false,
  //   pid: null
  // })
]);

const initState = List([]);

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      const newId = state.size + 1;
      return state.push(
        Map({
          id: newId,
          name: action.name,
          location: action.location,
          status: '',
          btns: btnsList
        }
      ));

    case 'DELETE_LIST':
      return state.delete(action.id);

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
          })

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
      })

    case 'ON_LIST_MOUSE_ENTER':
      return state.map(item => {
        if (item.get('id') == action.id) {
          return item.set('classes', action.classes);
        }
      });

    case 'ON_LIST_MOUSE_OUT':
      return state.map(item => {
        if (item.get('id') == action.id) {
          return item.set('classes', action.classes);
        }
      });

    default:
      return state;
  }
}
