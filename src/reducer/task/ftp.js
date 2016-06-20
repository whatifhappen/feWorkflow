import { List, Map } from 'immutable';

const initState = List([
  Map({
    name: 'Server',
    label: 'FTP服务器'
  }),
  Map({
    name: 'Port',
    label: '端口号'
  }),
  Map({
    name: 'Username',
    label: '用户名'
  }),
  Map({
    name: 'Password',
    label: '密码'
  }),
  Map({
    name: 'path',
    label: '远程路径'
  }),
]);

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_FTP':
      return state.setIn(['settings', 'ftp', 'name'], action.name);
    default:
      return state;  
  }
}
