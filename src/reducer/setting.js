import { Map } from 'immutable';
import { ftp } from './task/ftp';
import { syncFolder } from './task/sync-folder';
import { syncFolderTypes } from './task/sync-folder-types';
import { outputFolder } from './task/output-folder';
import { cssPreprocessor } from './task/css-preprocessor';
import { jsMinify } from './task/js-minify';
import { zip } from './task/zip';

const initState = new Map({
  showSettings: false,
  outputFolder,
  ftp,
  syncFolder,
  syncFolderTypes,
  cssPreprocessor,
  jsMinify,
  zip
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS_SHOW':
      return state.set('showSettings', action.showSettings);
    case 'SET_OUTPUT_FOLDER':
      return state.setIn(['outputFolder', action.index, 'value'], action.value);
    case 'SET_FTP':
      return state.setIn(['ftp', action.index, 'value'], action.value);
    case 'SET_SYNC_FOLDER':
      return state.setIn(['syncFolder', action.index, 'location'], action.location);
    case 'SET_SYNC_FOLDER_TYPES':
      return state.setIn(['syncFolderTypes', action.index, 'defaultChecked'], action.isChecked);
    case 'SET_CSS_PREPROCESSOR':
      return state.set('cssPreprocessor', action.value);
    case 'TOGGLE_JS_MINIFY':
      return state.set('jsMinify', action.value);
    case 'TOGGLE_ZIP':
      return state.set('zip', action.value);
    default:
      return state;
  }
}
