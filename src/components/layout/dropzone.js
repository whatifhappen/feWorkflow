import { connect } from 'react-redux';
import { addList } from '../../action/list';
import { onDragover, onDragleave, onDrop } from '../../action/dropzone';
import { parsePath } from '../parsePath';

const Dropzone = ({lists, dropzone, addList, onDragover, onDragleave, onDrop}) => (
  <div
    className={dropzone.get('classes')}
    id="dropzone"
    onDragOver={e => {
      console.log('inner dragover');
      onDragover();
      e.preventDefault();
      return false;
    }}
    onDragLeave={e => {
      onDragLeave();
      e.preventDefault();
    }}
    onDrop={e => {
      let files = e.dataTransfer.files;
      if (!files.length) return;

        console.log('files.length', files.length);
        console.log('files[0].path', files[0].path);
        let currentPath = parsePath(files[0].path)
        console.log('currentPath.folderName[0]', currentPath.folderName[0]);
        addList(currentPath.folderName[0], currentPath.src);
        onDrop();
      return false;
    }}
    >
  </div>
);

//
// class Dropzone extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log(props);
//   }
//
//   render() {
//     console.log('this', this);
//     return (
//       <div
//         className="dropzone"
//         id="dropzone"
//         onDragOver={e => {
//           console.log('inner dragover');
//           console.log('classList', this.classList);
//           e.preventDefault();
//           return false;
//         }}
//         onDrop={e => {
//           let files = e.dataTransfer.files;
//           if (!files.length) return;
//
//             console.log('files.length', files.length);
//             console.log('files[0].path', files[0].path);
//             let currentPath = parsePath(files[0].path)
//             console.log('currentPath.folderName[0]', currentPath.folderName[0]);
//             this.props.addList(currentPath.folderName[0], currentPath.src);
//           return false;
//         }}
//         >
//       </div>
//     )
//   }
// }

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
