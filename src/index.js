// import React from 'react';
import { render } from 'react-dom';
// import Listing from './App';
// import ListFolder from './components/list/List';
// import Dropzone from './components/layout/dropzone';
import { Provider } from 'react-redux';
import store from './store/store';
import Todos from './components/todos';

// render(<Dropzone type='folder' />, document.getElementById('root'));

// render(
//   <ListFolder
//     name="folder"
//     loc="location"
//   />,
//   document.getElementById('root')
// );
render(
  <Provider store={store}>
    <Todos />
  </Provider>,
  document.getElementById('root')
);
