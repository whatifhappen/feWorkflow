import { List, Map } from 'immutable';

export const operationBtns = List([
  Map({
    index: 0,
    name: 'openFolder',
    desc: '打开当前文件夹',
    icon: 'folder'
  }),
  Map({
    index: 1,
    name: 'openUrl',
    desc: '打开当前BrowserSync服务器地址',
    icon: 'link'
  }),
  Map({
    index: 2,
    name: 'delete',
    desc: '删除列表',
    icon: 'delete'
  })
]);
