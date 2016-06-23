export function toggleSettingsShow(showSettings = false) {
  return {
    type: 'TOGGLE_SETTINGS_SHOW',
    showSettings
  };
}
