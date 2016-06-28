import * as storage from 'redux-storage';
// Import redux and all your reducers as usual
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducer/reducer';
import merger from 'redux-storage-merger-immutablejs';

// We need to wrap the base reducer, as this is the place where the loaded
// state will be injected.
//
// Note: The reducer does nothing special! It just listens for the LOAD
//       action and merge in the provided state :)
// Note: A cusom merger function can be passed as second argument
const reducer = storage.reducer(reducers, merger);

// Now it's time to decide which storage reducer should be used
//
// Note: The arguments to `createEngine` are different for every engine!
// const engine = merger('setting');

// And with the engine we can create our middleware function. The middleware
// is responsible for calling `engine.save` with the current state afer
// every dispatched action.
//
// Note: You can provide a list of action types as second argument, those
//       actions will be filtered and WON'T trigger calls to `engine.save`!
const middleware = storage.createMiddleware(reducer);

// As everything is prepared, we can go ahead and combine all parts as usual
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(reducer);

// At this stage the whole system is in place and every action will trigger
// a save operation.
//
// BUT (!) an existing old state HAS NOT been restored yet! It's up to you to
// decide when this should happen. Most of the times you can/should do this
// right after the store object has been created.

// To load the previous state we create a loader function with our prepared
// reducer. The result is a function that can be used on any store object you
// have at hand :)
const load = storage.createLoader(reducer);
load(store);

// Notice that our load function will return a promise that can also be used
// to respond to the restore event.
load(store)
  .then((newState) => console.log('Loaded state:', newState))
  .catch(() => console.log('Failed to load previous state'));
