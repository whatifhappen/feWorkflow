export function onDragover() {
  return {
    dragover: true,
    type: 'ON_DRAGOVER',
    show: true
  }
}

export function onDragleave() {
  return {
    type: 'ON_DRAGLEAVE',
    ondragleave: true,
    show: false
  }
}

export function onDrop() {
  return {
    type: 'ON_DROP',
    ondrop: true,
    show: false
  }
}
