import { List, Map } from 'immutable';

export const syncFolderTypes = List([
  Map({
    name: 'css',
    defaultChecked: true
  }),
  Map({
    name: 'img',
    defaultChecked: true
  }),
  Map({
    name: 'html',
    defaultChecked: false
  }),
  Map({
    name: 'js',
    defaultChecked: false
  }),
  Map({
    name: 'font',
    defaultChecked: false
  }),
  Map({
    name: 'media',
    defaultChecked: false
  }),
]);
