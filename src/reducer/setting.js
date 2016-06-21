import { List, Map } from 'immutable';

const ftp = List([
  Map({
    index: 0,
    name: 'Server',
    label: 'FTP服务器',
    value: ''
  }),
  Map({
    index: 1,
    name: 'Port',
    label: '端口号',
    value: ''
  }),
  Map({
    index: 2,
    name: 'Username',
    label: '用户名',
    value: ''
  }),
  Map({
    index: 3,
    name: 'Password',
    label: '密码',
    value: ''
  }),
  Map({
    index: 4,
    name: 'path',
    label: '远程路径',
    value: ''
  }),
]);

const initState = new Map({
  showSettings: false,
  ftp
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS_SHOW':
      return state.set('showSettings', action.showSettings);
    case 'SET_FTP':
      return state.setIn(['ftp', action.index, 'value'], action.value);
    default:
      return state;
  }
}
