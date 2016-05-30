export function addList (name, location) {
  return {
    type: 'ADD_LIST',
    name,
    location
  }
}

export function processing(index, name, pid, data) {
  return {
    btns: [
      {
        index,
        type: 'PROCESSING',
        name,
        pid,
        process: true,
        data
      }
    ]
  }
}

export function cancelBuild(index, text, pid, data, fail) {
  return {
    btns: [
      {
        index,
        type: 'CANCEL_BUILD',
        text,
        pid: '',
        process: false,
        fail,
        data
      }
    ]
  }
}
