import { render } from 'react-dom';
import Container from './components/container';
import { Provider } from 'react-redux';
import store from './store/store';
import '../css/style.less';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import devtools from './store/devtools';

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

console.log('state', store.getState().operationBtns.toJS());
render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <Container />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);


const dropzone = document.getElementById('dropzone');
let dragEnterElem;

document.addEventListener('dragenter', function (event) {
  dragEnterElem = event.target;
  dropzone.classList.add('ondragover');
  event.preventDefault();
  return false;
}, false);

document.addEventListener('dragover', function (event) {
  event.preventDefault();
  return false;
}, false);

document.addEventListener('dragleave', function (event) {
  if (dragEnterElem == event.target) {
    dropzone.classList.remove('ondragover');
  }
  event.preventDefault();
  return false;
}, false);

document.addEventListener('drop', function (event) {
  dropzone.classList.remove('ondragover');
  event.preventDefault();
  return false;
}, false);
