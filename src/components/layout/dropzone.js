import { connect } from 'react-redux';
import { addList } from '../../action/list';
import { onDragover, onDragleave, onDrop, toggleDropzoneShow } from '../../action/dropzone';
import { handleDragFiles } from '../handleDragfile';
import fs from 'fs';


window.ondragover = function (e) {
  dispatch(toggleDropzoneShow());
  e.preventDefault();
};

window.ondrop = function (e) {
  dispatch(toggleDropzoneShow());
  handleDragFiles(e);
  e.preventDefault();
};

// function Dropzone ({lists, onDragover, onDragleave, onDrop}) {
//   console.log('thsi',this);
//   return (
//     <div
//       class="dropzone"
//       id="dropzone"
//       ondragover={() => onDragover()}
//       ondragleave={() => onDragleave()}
//       ondrop={(obj, e) => {
//         handleDragFiles(obj, e)
//         return false;
//       }}
//     >
//     </div>
//   )
// }

class Dropzone extends React.Component {
  render() {
    console.log('this', this);
    return (
        <div
          className="dropzone"
          id="dropzone"
          ondragover={() => onDragover()}
          ondragleave={() => onDragleave()}
          ondrop={e => {
            handleDragFiles(this, e);
            return false;
          }}
        >
        </div>
    )
  }
}

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
