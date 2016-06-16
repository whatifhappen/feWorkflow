export function addList (name, location) {
  return {
    type: 'ADD_LIST',
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


export function onListMouseEnter(id) {
  return {
    id,
    type: 'ON_LIST_MOUSE_ENTER',
    classes: 'list-item show-list-operation'
  }
}

export function onListMouseOut(id) {
  return {
    id,
    type: 'ON_LIST_MOUSE_OUT',
    classes: 'list-item'
  }
}
