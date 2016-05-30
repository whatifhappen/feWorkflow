import { List, Map } from 'immutable';

const btnsList = List([
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
]);

const initState = List([
  Map({
    id: 1,
    type: '',
    name: 'FolderName',
    location: 'FolderLocation',
    btns: btnsList
  })
]);

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      const newId = state.size + 1;
      return state.push(
        Map({
          id: newId,
          name: action.name,
          location: action.location,
          btns: btnsList
        }
      ));

    case 'PROCESSING':
      return state.map(item => {
        if (item.get('id') == action.id) {
          return item.getIn(['btns', action.index]).withMutations(i => {
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
      return state.map(item => {
        if (item.get('id') == action.id) {
          return item.getIn(['btns', action.index]).withMutations(i => {
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
