import spawn from 'child_process';

export function processing(index, name) {
  return {
    index,
    type: 'PROCESSING',
    name,
    process: true
  }
}

export function cancelBuild(index, text, pid) {
  return {
    index,
    type: 'CANCEL_BUILD',
    name: text,
    pid,
    process: false
  }
}
