export function addList (name, location) {
  return {
    type: 'ADD_LIST',
    name,
    location
  }
}

export function processing(id, index, btnName, pid, data) {
  return {
    id,
    index,
    type: 'PROCESSING',
    btnName,
    pid,
    process: true,
    data
  };
}

export function cancelBuild(id, index, text, pid, data, fail) {
  return {
    id,
    index,
    type: 'CANCEL_BUILD',
    text,
    pid: '',
    process: false,
    fail,
    data
  }
}
