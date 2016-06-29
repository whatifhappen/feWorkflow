import { List, Map } from 'immutable';

export const btnsList = List([
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
    pid: null,
  }),
  Map({
    index: 2,
    type: 'WAIT',
    name: 'FTP',
    cmd: 'ftp',
    flag: '',
    process: false,
    fail: false,
    pid: null,
  }),
  Map({
    index: 3,
    type: 'WAIT',
    name: '复制到文件夹',
    cmd: 'copy',
    flag: '',
    process: false,
    fail: false,
    pid: null,
  })
]);
