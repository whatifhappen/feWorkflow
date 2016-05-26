export function processing(index, name, pid, data) {
  return {
    index,
    type: 'PROCESSING',
    name,
    pid,
    process: true,
    data
  }
}

export function cancelBuild(index, text, pid, data, fail) {
  return {
    index,
    type: 'CANCEL_BUILD',
    text,
    pid: '',
    process: false,
    fail,
    data
  }
}
