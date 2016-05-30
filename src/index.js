import { render } from 'react-dom';
import Container from './components/container';
import { Provider } from 'react-redux';
import store from './store/store';
import '../css/style.less';

console.log('store', store.getState());
render(
  <div>
    <Provider store={store}>
      <Container />
    </Provider>
  </div>,
  document.getElementById('container')
);
