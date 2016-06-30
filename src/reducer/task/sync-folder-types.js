import { List, Map } from 'immutable';

export const syncFolderTypes = List([
  Map({
    name: 'css',
    defaultChecked: true,
    extension: 'css'
  }),
  Map({
    name: 'img',
    defaultChecked: true,
    extension: 'png|jpg|gif|svg'
  }),
  Map({
    name: 'html',
    defaultChecked: false,
    extension: 'html|php'
  }),
  Map({
    name: 'js',
    defaultChecked: false,
    extension: 'js'
  }),
  Map({
    name: 'font',
    defaultChecked: false,
    extension: 'ttf|wof'
  }),
  Map({
    name: 'media',
    defaultChecked: false,
    extension: 'aac|mp3'
  }),
]);
