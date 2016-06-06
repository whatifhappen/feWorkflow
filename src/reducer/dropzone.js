import { Map } from 'immutable';

const initState = new Map({
  dragover: false,
  dragleave: false,
  ondrop: false,
  show: false
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'ON_DRGAOVER':
      return state.set('dragover', action.dragover)
    case 'ON_DRAGLEAVE':
      return state.set('ondragleave', action.ondragleave)
    case 'ON_DROP':
      return state.set('ondrop', action.ondrop)
    case 'TOGGLE_DROPZONE_SHOW':
      return state.set('show', !action.show);
    default:
      return state;
  }
}
