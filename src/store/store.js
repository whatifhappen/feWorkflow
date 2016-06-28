import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer/reducer';
import thunk from 'redux-thunk';
import { getConfig } from '../action/config';

//
// export default createStore(reducer);
// import {compose, createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import {devTools} from 'redux-devtools';

// export default function store(initialState) {
//   let middlewares = [
//     applyMiddleware(thunk),
//     devTools(),
//   ];

//   const store = compose(...middlewares)(createStore);

//   return store(reducer, initialState);
// }

const data = getConfig('config');

/* response middleware */
const responseMiddleware = store => next => action => {
  const { type, ...rest } = action;

  if (type !== 'DATA_REQUEST') return next(action);

  next(action);
  setTimeout(() => {
    next({
      ...rest,
      type: 'DATA_RESPONSE',
      res: {
        data: data
      }
    });
  }, 700);
};

/* create store */
const store = createStore(
  reducer,
  applyMiddleware(responseMiddleware)
);
