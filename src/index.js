import { render } from 'react-dom';
import Container from './components/container';
import ListFolder from './components/list/list';
// import Dropzone from './components/layout/dropzone';
import { Provider } from 'react-redux';
import store from './store/store';
import '../css/style.less';

// render(<Dropzone type='folder' />, document.getElementById('root'));

console.log('store', store.getState());
render(
  <Provider store={store}>
    <ListFolder />
  </Provider>,
  document.getElementById('root')
);
