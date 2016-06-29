import { List, Map } from 'immutable';
import { ftp } from './task/ftp';
import { syncFolder } from './task/sync-folder';
import { syncFolderTypes } from './task/sync-folder-types';
import { outputFolder } from './task/output-folder';

const initState = new Map({
  showSettings: false,
  outputFolder,
  ftp,
  syncFolder,
  syncFolderTypes,
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
    case 'SET_SYNC_FOLDER_TYPE':
      return state;
      // return state.setIn(['syncFolderLoc', action.index, 'location'], action.location)
    default:
      return state;
  }
}
