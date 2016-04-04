import {VisibilityFilter} from './actions/todo';

const initialState = {
  visibilityFilter: VisibilityFilter.SHOW_ALL,
  todos: []
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

function todoApp(state = initialState, action) {

  console.log('action', action);
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });

    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...statte.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      });

    case COMPLETE_TODO:
      return Object.assign({}, state, {
        todos: todo(state.todos, action)
      });

    default:
      return state
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter
  default:
    return state
  }
}