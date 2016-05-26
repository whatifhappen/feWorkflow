import { List, Map } from 'immutable';

const initState = List([
  Map({
    index: 0,
    type: '',
    name: '',
    location: ''
  })
]);

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_LIST_ITEM':
      return state.push(Maps({
        index: action.index,
        name: action.name,
        location: action.location
      }));
    default:
      return state;
  }
}
