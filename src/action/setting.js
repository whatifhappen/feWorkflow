export function toggleSettingsShow(showSettings = false) {
  return {
    type: 'TOGGLE_SETTINGS_SHOW',
    showSettings
  };
}

export function setFtp(index, value) {
  return {
    type: 'SET_FTP',
    index,
    value
  };
}
