import { parsePath } from './parsePath';

export function handleDragFiles (obj, e) {
  var isDragOver = obj.tagName == 'INPUT' ? 0 : 1,
    files = isDragOver ? e.dataTransfer.files : e.target.files,
    output = [];

  dropzone.classList.remove('on-drop-zone');
  for (var i = 0, f; f = files[i]; i++) {
    _parsePath = parsePath(f);
    // fileType
    if (dropzoneType == 'image' && f.type.match('\.(png|gif|jpeg|svg.*)$')) {
      // if (f.type.match(dropzoneType)) {
      outputImage(f);
    }

    if (f.type.match(dropzoneType) || f.name.match(dropzoneType)) {
      list.classList.remove('thumb-list');
      output.push('<li data-path="', f.path, '"><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ', '<p>path: ', f.path, '</p></li>');
    }
  }

  list.innerHTML = ['' + output.join('') + '<i class="close"></i>'];

  if (dropzoneType == 'copy') {
    resetCopyPath(_parsePath);
  } else {
    directory.value = _parsePath.src;
  }
  
  if (obj.tagName == 'DIV') {
    e.preventDefault();
    e.stopPropagation();
  }

  startGulp();
}

/**
 * 拖拽、点击选择时输出图片
 * @param  {[type]} f [description]
 * @return {[type]}   [description]
 */
export function outputImage (f) {
  var reader = new FileReader();

  list.classList.add('thumb-list');
  // Closure to capture the file information.
  reader.onload = (function (theFile) {
    return function (e) {
      // Render thumbnail.
      var li = document.createElement('li'),
        str = '',
        liArray = [];
      str = '<div class="thumb-wrap">' +
        '<img class="thumb" src="' + e.target.result +
        '" title="' + escape(theFile.name) +
        '"/></div>' +
        '<p class="thumb-name">' + escape(theFile.name) + '</p>' +
        '<p class="thumb-path hide">' + theFile.path + '</p>';
      liArray.push(str);
      li.innerHTML = liArray.join('');
      li.setAttribute('data-path', theFile.path);
      list.insertBefore(li, null);
    };
  })(f);

  // Read in the image file as a data URL.
  reader.readAsDataURL(f);
}
