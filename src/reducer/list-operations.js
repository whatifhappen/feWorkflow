import { List, Map } from 'immutable';

const initState = List([
  Map({
    index: 0,
    name: 'openFolder',
    desc: '打开当前文件夹',
    iconType: 'file',
    icon: 'folder'
  }),
  Map({
    index: 1,
    name: 'openUrl',
    desc: '打开当前BrowserSync服务器地址',
    iconType: 'content',
    icon: 'link'
  }),
  Map({
    index: 2,
    name: 'delete',
    desc: '删除列表',
    iconType: 'action',
    icon: 'delete'
  })
]);

export default () => initState;
