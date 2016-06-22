import { List, Map } from 'immutable';

const ftp = List([
  Map({
    index: 0,
    name: 'Host',
    label: 'FTP服务器',
    value: '10.123.19.48'
  }),
  Map({
    index: 1,
    name: 'Port',
    label: '端口号',
    value: '36000'
  }),
  Map({
    index: 2,
    name: 'Username',
    label: '用户名',
    value: 'root'
  }),
  Map({
    index: 3,
    name: 'Password',
    label: '密码',
    value: 'itcloud@123'
  }),
  Map({
    index: 4,
    name: 'localPath',
    label: '默认本地目录',
    value: '/Users/TEN/Sites/Code/work/vd'
  }),
  Map({
    index: 5,
    name: 'remotePath',
    label: '默认远程路径',
    value: '/data/b2b2c/web_static/static/vd'
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
