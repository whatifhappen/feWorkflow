import { List, Map } from 'immutable';

const ftp = List([
  Map({
    name: 'Server',
    label: 'FTP服务器',
    value: ''
  }),
  Map({
    name: 'Port',
    label: '端口号',
    value: ''
  }),
  Map({
    name: 'Username',
    label: '用户名',
    value: ''
  }),
  Map({
    name: 'Password',
    label: '密码',
    value: ''
  }),
  Map({
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
      return state.update(ftp, (i) => (
        console.log('i', i)
      ));
    default:
      return state;
  }
}
