import { List, Map } from 'immutable';
import { ftp } from './task/ftp';
import { syncFolder } from './task/sync-folder';
import { syncFolderTypes } from './task/sync-folder-types';

const initState = new Map({
  showSettings: false,
  syncFolder,
  syncFolderTypes,
  ftp
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS_SHOW':
      return state.set('showSettings', action.showSettings);
    case 'SET_FTP':
      return state.setIn(['ftp', action.index, 'value'], action.value);
    case 'SET_SYNC_FOLDER':
      return state.setIn(['syncFolderLoc', action.index, 'location'], action.location);
    case 'SET_SYNC_FOLDER_TYPE':
      return state.setIn(['syncFolderLoc', action.index, 'location'], action.location)
    default:
      return state;
  }
}
