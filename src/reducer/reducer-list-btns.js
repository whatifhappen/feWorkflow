import { List, Map } from 'immutable';
const initState = List([
  Map({
    index: 0,
    type: 'WAIT',
    name: 'DEV'
  }),
  Map({
    index: 1,
    type: 'WAIT',
    name: 'BUILD'
  }),
  Map({
    index: 2,
    type: 'WAIT',
    name: 'FTP'
  })
]);

export default (state = initState, action) => {
  switch(action.type) {
    case 'PROCESSING':
      return state.push(Map(action.state));
    case 'CANCEL_BUILD':
      return state.update(action.process, process => !process);
    default:
      return state
  }
}
