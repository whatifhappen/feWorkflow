import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ListFolder from './list';
import { addList } from '../../action/list';
import { connect } from 'react-redux';
import { remote } from 'electron';
import { parsePath } from '../parsePath';
// import { ipcRenderer as ipc, dialog, BrowserWindow }  from 'electron';
const { dialog } = remote;

const style = {
  margin: '0 20px 15px 0',
  float: 'right'
};

const AddListBtn = ({ lists, addList }) => (
  <FloatingActionButton
    style={style}
    onClick={(event) => {
      dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections'],
        filters: [
          {name: 'Images', extensions: ['jpg', 'png', 'gif']},
          {name: 'Html', extensions: ['html', 'php']},
          {name: 'css', extensions: ['css', 'less', 'sass', 'scss']},
          {name: 'js', extensions: ['js', 'jsx']},
          {name: 'All Files', extensions: ['*']}
        ]
      }, fileNames => {
        if (fileNames === undefined) return;

        let curPath = parsePath(fileNames[0]);
        addList(curPath.folderName, curPath.src, curPath.dist);

        return false;
      });
    }}
  >
    <ContentAdd />
  </FloatingActionButton>

);

function mapStateToProps(states) {
  return {
    lists: states.lists
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addList: (name, location) => dispatch(addList(name, location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddListBtn);
