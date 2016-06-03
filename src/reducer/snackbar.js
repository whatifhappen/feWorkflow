import { Map } from 'immutable';

const initState = new Map({
  msg: 'Oops, 出错啦。请稍后再试',
  open: false
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_SNACKBAR':
      return state.withMutations(i => {
        i
          .set('msg', action.msg)
          .set('open', action.open);
      });

    case 'CLOSE_SNACKBAR':
      return state.set('open', action.open);

    default:
      return state;
  }
}
