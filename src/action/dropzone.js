export function onDragover() {
  return {
    dragover: true,
    type: 'ON_DRAGOVER',
    classes: 'dropzone ondragover',
    show: true
  }
}

export function onDragleave() {
  return {
    type: 'ON_DRAGLEAVE',
    ondragleave: true,
    classes: 'dropzone',
    show: false
  }
}

export function onDrop() {
  return {
    type: 'ON_DROP',
    ondrop: true,
    classes: 'dropzone',
    show: false
  }
}
