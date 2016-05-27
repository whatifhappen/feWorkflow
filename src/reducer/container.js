import { List, Map } from 'immutable';

const initState = List([
  Map({
    ondragover: false,
    ondragleave: false,
    ondrop: false
  })
]);

export default (state = initState, action) => {
  switch (action.type) {
    case 'ON_DRGAOVER':
      return state.map(item => {
        item.withMutations(i => {
          i
            .set('ondragover', action.ondragover)
            .set('show', action.show)
        });
      });
    case 'ON_DRAGLEAVE':
      return state.map(item => {
        item.withMutations(i => {
          i
            .set('ondragleave', action.ondragleave)
            .set('show', action.show)
        });
      });
    case 'ON_DROP':
      return state.map(item => {
        item.withMutations(i => {
          i
            .set('ondrop', action.ondrop)
            .set('show', action.show)
        });
      });
    default:
      return state;
  }
}
