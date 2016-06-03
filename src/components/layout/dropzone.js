import { connect } from 'react-redux';
import { addList } from '../../action/list';
import { onDragover, onDragleave, onDrop } from '../../action/dropzone';
import { handleDragFiles } from '../handleDragfile';
import fs from 'fs';

const Dropzone = ({lists, onDragover, onDragleave, onDrop}) => (
  <div
    class="dropzone"
    id="dropzone"
    ondragover={() => onDragover()}
    ondragleave={() => onDragleave()}
    ondrop={(obj, e) => {
      handleDragFiles(obj, e)
      return false;
    }}
  >
  </div>
)

function mapStateToProps(states) {
  return {
    lists: states.lists
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addList: (index, name, location) => dispatch(addList(index, name, location)),
    onDragover: () => dispatch(onDragover()),
    onDragleave: () => dispatch(onDragleave()),
    onDrop: () => dispatch(onDrop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone);
