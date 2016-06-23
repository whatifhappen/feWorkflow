import { List, Map } from 'immutable';

export const ftp = List([
  Map({
    index: 0,
    name: 'Host',
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
    name: 'localPath',
    label: '默认本地目录',
    value: ''
  }),
  Map({
    index: 5,
    name: 'remotePath',
    label: '默认远程路径',
    value: ''
  }),
]);
