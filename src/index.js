import { render } from 'react-dom';
import ListFolder from './components/list/List';
// import Dropzone from './components/layout/dropzone';
import { Provider } from 'react-redux';
import store from './store/store-list-btns';

// render(<Dropzone type='folder' />, document.getElementById('root'));

console.log('store', store.getState());
render(
  <Provider store={store}>
    <ListFolder
      name="folder"
      loc="location"
    />
  </Provider>,
  document.getElementById('root')
);
