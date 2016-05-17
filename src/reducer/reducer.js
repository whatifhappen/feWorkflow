import Immutable from 'immutable';
const initState = Immutable.List([
  'Code here!'
]);

export default (state = initState, action) => {
  switch (action.type) {
    case 'addTodo':
      return state.push(action.todo);
    default:
      return state;
  }
}
