export function toggleSettingsShow(showSettings = false) {
  return {
    type: 'TOGGLE_SETTINGS_SHOW',
    showSettings
  };
}

export function setFtp({ server, port, username, pass, path }) {
  return {
    type: 'SET_FTP',
    server,
    port,
    username,
    pass,
    path
  };
}
