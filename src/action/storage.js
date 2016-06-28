import { LOAD, SAVE } from 'redux-storage';
import { Map } from 'immutable';

export function storeageAwareReducer(state = new Map({ loaded: false }), action) {
  switch (action.type) {
    case LOAD:
      return state.set('loaded', true);

    case SAVE:
      console.log('Something has changed and written to disk!');

    default:
      return state;
  }
}
