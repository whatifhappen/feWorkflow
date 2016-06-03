export function addList (name, location) {
  return {
    type: 'ADD_LIST',
    name,
    location
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
