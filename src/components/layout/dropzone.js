import { shell } from 'electron';
import os from 'os';

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
      id="fileManagerBtn"
      onClick={shell.showItemInFolder(os.homedir())}
    />
  </div>
}

export default Dropzone;