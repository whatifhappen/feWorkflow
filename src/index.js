import { render } from 'react-dom';
import Container from './components/container';
import { Provider } from 'react-redux';
import store from './store/store';
import createStore from './store/store';
import '../css/style.less';
import devtools from './store/devtools';

const testStore = createStore();

console.log('store', testStore.getState());
render(
  <div>
    <Provider store={testStore}>
      <Container />
    </Provider>

    {devtools(testStore)}
  </div>,
  document.getElementById('container')
);
