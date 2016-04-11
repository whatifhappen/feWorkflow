import React from 'react';



class Dropzone extends React.Component  {
  ondragover = () => {
    console.log('ondragover')
    return false;
  },
   ondragleave = () => {
    console.log('ondragleave')
    return false;
  },
  ondrop = (e => ){
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    console.log('File you dragged here is', file.path);
    return false;
  },
  render() {
    return (
      <div class="dropzone" id="dropzone" data-type={{type}} ondragover={this.drageover} ondragleave={this.dragleave} ondrop={this.ondrop}>
        <p>将文件夹拖放到此处 或 点击</p>
        <input type="file" name="files[]" id="inputFiles" class="input-files" multiple webkitdirectory />
      </div>
    );
  }
}

export default Dropzone;