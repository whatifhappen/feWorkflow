import { List, Map } from 'immutable';

export const syncFolder = List([
  Map({
    name: 'syncFromFolder',
    label: '从目录复制',
    location: ''
  }),
  Map({
    name: 'syncToFolder',
    label: '复制到目录',
    location: ''
  })
]);
