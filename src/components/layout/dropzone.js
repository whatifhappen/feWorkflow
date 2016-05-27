import { ipcRenderer } from 'electron';
import os from 'os';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';

ipcRenderer.on('selectedDirectory', function (event, path) {
  document.getElementById('selected-file').innerHTML = `You selected: ${path}`
})

const Dropzone = ({type, onDragover, onDragleave, onDrop}) => {
  <div
    class="dropzone"
    id="dropzone"
    data-type={type}
    ondragover={onDragover}
    ondragleave={onDragleave}
    ondrop={onDrop}
  >
    <RaisedButton
      label="Default"
      id="selectedDirectory"
      onClick={() => {ipcRenderer.send('open-file-dialog')}}
    />
  </div>
}

export default Dropzone;
