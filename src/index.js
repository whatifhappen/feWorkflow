import { render } from 'react-dom';
import Container from './components/container';
import { Provider } from 'react-redux';
import store from './store/store';
import '../css/style.less';
import createStore from './store/store';
import devtools from './store/devtools';

// const testStore = createStore();

// console.log('store', testStore.getState());
// render(
//   <div>
//     <Provider store={testStore}>
//       <Container />
//     </Provider>

//     {devtools(testStore)}
//   </div>,
//   document.getElementById('container')
// );

console.log('store', store.getState());
render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('container')
);


const dropzone = document.getElementById('dropzone');

document.addEventListener('dragover', function (event) {
  dropzone.classList.add('ondragover');
  event.preventDefault();
  return false;
}, false);

document.addEventListener('dragleave', function (event) {
  dropzone.classList.remove('ondragover');
  event.preventDefault();
  return false;
}, false);

document.addEventListener('drop', function (event) {
  dropzone.classList.remove('ondragover');
  event.preventDefault();
  return false;
}, false);
