import { connect } from 'react-redux';
import { addList } from '../../action/list';
import { onDragover, onDragleave, onDrop } from '../../action/dropzone';
import { parsePath } from '../parsePath';

const Dropzone = ({lists, dropzone, addList, onDragover, onDragleave, onDrop}) => (
  <div
    className={dropzone.get('classes')}
    id="dropzone"
    onDragOver={e => {
      onDragover();
      e.preventDefault();
      return false;
    }}
    onDragLeave={e => {
      onDragleave();
      e.preventDefault();
    }}
    onDrop={e => {
      let files = e.dataTransfer.files;
      if (!files.length) return;

      let currentPath = parsePath(files[0].path);
      addList(currentPath.folderName[0], currentPath.src);
      onDrop();
      return false;
    }}
    >
  </div>
);

function mapStateToProps(states) {
  return {
    lists: states.lists,
    dropzone: states.dropzone
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addList: (name, location) => dispatch(addList(name, location)),
    onDragover: () => dispatch(onDragover()),
    onDragleave: () => dispatch(onDragleave()),
    onDrop: () => dispatch(onDrop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone);
