import { List, Map } from 'immutable';
const initState = List([
  Map({
    index: 0,
    type: 'WAIT',
    name: 'DEV',
    process: false,
    pid: null
  }),
  Map({
    index: 1,
    type: 'WAIT',
    name: 'BUILD',
    process: false,
    pid: null
  }),
  Map({
    index: 2,
    type: 'WAIT',
    name: 'FTP',
    process: false,
    pid: null
  })
]);

const initGulpCommand = List([

]);

export default (state = initState, action) => {
  switch(action.type) {
    case 'PROCESSING':
      return state.map(item => {
        if (item.get('index') == action.index) {
          return item.withMutations(i => {
            i.set('process', action.process).set('text', action.name).set('name', '编译中...').set('pid', action.pid);
          });
        } else {
          return item;
        }
      });
    case 'CANCEL_BUILD':
      console.log('state', state);
      return state.map(item => {
        if (item.get('index') == action.index) {
          return item.withMutations(i => {
            i.set('process', false).set('name', action.name);
          });
        } else {
          return item;
        }
      });
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
