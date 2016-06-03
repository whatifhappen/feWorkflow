import { Map } from 'immutable';

const initState = new Map({
  dragover: false,
  dragleave: false,
  ondrop: false
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'ON_DRGAOVER':
      return state.set('dragover', action.dragover)
    case 'ON_DRAGLEAVE':
      return state.set('ondragleave', action.ondragleave)
    case 'ON_DROP':
      return state.set('ondrop', action.ondrop)
    default:
      return state;
  }
}
