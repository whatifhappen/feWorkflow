import { List, Map } from 'immutable';
const initState = List([
  Map({
    index: 0,
    type: 'WAIT',
    name: 'DEV',
    process: false
  }),
  Map({
    index: 1,
    type: 'WAIT',
    name: 'BUILD',
    process: false
  }),
  Map({
    index: 2,
    type: 'WAIT',
    name: 'FTP',
    process: false
  })
]);

const initGulpCommand = List([

]);

export default (state = initState, action) => {
  switch(action.type) {
    case 'PROCESSING':
      return state.map(item => {
        if (item.get('index') == action.index) {
          return item.update('process', process => !process);
        } else {
          return item;
        }
      });
    case 'CANCEL_BUILD':
      return state.update(action.process, () => (!action.process));
    default:
      return state
  }
}
//
// const runGulp = (state = initGulpCommand) => {
//   switch (action.type) {
//     case 'PROGRESSING':
//       return state;
//     default:
//       return state;
//   }
// }

// combineReducer(runGulp, )
