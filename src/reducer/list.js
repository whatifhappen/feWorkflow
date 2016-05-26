import { List, Map } from 'immutable';

const initState = List([
  Map({
    index: 0,
    type: '',
    name: 'FolderName',
    location: 'FolderLocation'
  })
]);

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return state.push(Map({
        index: action.index,
        name: action.name,
        location: action.location
      }));
    default:
      return state;
  }
}
