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

const operationBtns = List([
  Map({
    index: 0,
    name: 'openFolder',
    desc: '打开当前文件夹',
    icon: 'folder'
  }),
  // Map({
  //   index: 1,
  //   name: 'openUrl',
  //   desc: '打开当前BrowserSync服务器地址',
  //   icon: 'link'
  // }),
  Map({
    index: 1,
    name: 'delete',
    desc: '删除列表',
    icon: 'delete'
  })
]);

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
          operationBtns
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
