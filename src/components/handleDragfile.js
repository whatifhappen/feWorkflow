import { parsePath } from './parsePath';

export function handleDragFiles (e) {
  let files = e.dataTransfer.files,
    output = [];

    console.log('handleDragFiles', files)
  dropzone.classList.remove('ondragover');
  for (let i = 0, f; f = files[i]; i++) {
    _parsePath = parsePath(f);
    console.log('parsePath', _parsePath);
  }
}
