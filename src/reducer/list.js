import { List, Map } from 'immutable';

const initState = List([
  Map({
    index: 0,
    type: '',
    name: 'FolderName',
    location: 'FolderLocation',
    btns: List([
      Map({
        index: 0,
        type: 'WAIT',
        name: 'DEV',
        cmd: 'dev',
        process: false,
        fail: false,
        pid: null
      }),
      Map({
        index: 1,
        type: 'WAIT',
        name: 'BUILD',
        cmd: '',
        process: false,
        fail: false,
        pid: null
      }),
      Map({
        index: 2,
        type: 'WAIT',
        name: 'FTP',
        cmd: 'ftp',
        process: false,
        fail: false,
        pid: null
      })
    ])
  })
]);

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return state.push(Map({
        index: action.index,
        name: action.name,
        location: action.location
      }));

    case 'PROCESSING':
      return state.btns.map(item => {
        if (item.get('index') == action.index) {
          return item.withMutations(i => {
            i
              .set('process', action.process)
              .set('text', action.name)
              .set('name', '编译中...')
              .set('pid', action.pid);
          });
        } else {
          return item;
        }
      });

    case 'CANCEL_BUILD':
      return state.btns.map(item => {
        if (item.get('index') == action.index) {
          return item.withMutations(i => {
            i
              .set('process', action.process)
              .set('name', action.text)
              .set('text', '编译中...')
              .set('fail', action.fail)
              .set('pid', action.pid);
          });
        } else {
          return item;
        }
      });
    default:
      return state;
  }
}
