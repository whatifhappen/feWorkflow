export function cancelBuild(index, name, isProcess) {
  return {
    index: index,
    type: 'CANCEL_BUILD',
    name: name,
    process: false
  }
}

export function processing(index) {
  return {
    index: index,
    type: 'PROCESSING',
    text: '编译中...',
    process: true
  }
}
