import { List, Map } from 'immutable';

const btnsList = List([
  Map({
    index: 0,
    type: 'WAIT',
    name: 'DEV',
    cmd: 'dev',
    flag: '--development',
    process: false,
    fail: false,
    pid: null
  }),
  Map({
    index: 1,
    type: 'WAIT',
    name: 'BUILD',
    cmd: '',
    flag: '--production',
    process: false,
    fail: false,
    pid: null
  }),
  Map({
    index: 2,
    type: 'WAIT',
    name: 'FTP',
    cmd: 'ftp',
    flag: '',
    process: false,
    fail: false,
    pid: null
  })
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

    case 'PROCESSING':
      return state.map(item => {
        if (item.get('id') == action.id) {
          let curBtns = item.get('btns').filter(btn => btn.get('index') == action.btns.index);

          return item.withMutations(i => {
            i
              .set('status', action.btns.cmd)
              .setIn(['btns', action.btns.index, 'text'], action.btns.name)
              .setIn(['btns', action.btns.index, 'name'], '编译中...')
              .setIn(['btns', action.btns.index, 'process'], action.btns.process)
              .setIn(['btns', action.btns.index, 'pid'], action.btns.pid);
          })

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

    default:
      return state;
  }
}
