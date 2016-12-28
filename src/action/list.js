// succinct hack for generating passable unique ids
const uid = () => Math.random().toString(34).slice(2);

export function addList (name, location) {
  return {
    type: 'ADD_LIST',
    id: uid(),
    name,
    location
  }
}

export function deleteList(id) {
  return {
    type: 'DELETE_LIST',
    id
  }
}

export function processing(id, index, name, pid, data) {
  return {
    id,
    type: 'PROCESSING',
    btns: {
      index,
      name,
      pid,
      data,
      process: true,
      cmd: name
    }
  };
}

export function cancelBuild(id, index, text, pid, data, fail) {
  return {
    id,
    type: 'CANCEL_BUILD',
    btns: {
      index,
      text,
      pid: '',
      process: false,
      fail,
      data,
      cmd: text
    }
  }
}

export function toggleListHoverState(id, showOperation) {
  return {
    id,
    type: 'TOGGLE_LIST_HOVER_STATE',
    showOperation
  };
}
