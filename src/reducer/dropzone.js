import { Map } from 'immutable';

const initState = new Map({
  dragover: false,
  dragleave: false,
  ondrop: false,
  show: false,
  classes: 'dropzone'
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'ON_DRGAOVER':
      return state.set('classes', action.classes)
    case 'ON_DRAGLEAVE':
      return state.set('classes', action.classes)
    case 'ON_DROP':
      return state.set('classes', action.classes)
    default:
      return state;
  }
}
