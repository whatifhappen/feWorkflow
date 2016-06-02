import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';

export default function devtools(store) {
  const stateSelector = state => state;

  return (
    <DebugPanel top right bottom key="devtools" style={{marginBottom: '70'}}>
      <DevTools select={stateSelector} store={store} monitor={LogMonitor} />
    </DebugPanel>
  );
}
