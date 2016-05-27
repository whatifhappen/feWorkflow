import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ListFolder from './list';
import { addList } from '../../action/list';
import { connect } from 'react-redux';
import { remote } from 'electron';
// import { ipcRenderer as ipc, dialog, BrowserWindow }  from 'electron';
const { dialog } = remote;

const style = {
  marginLeft: 20,
};

// ipc.on('open-file-dialog', function (event) {
//   dialog.showOpenDialog({
//     properties: ['openFile', 'openDirectory']
//   }, function (files) {
//     if (files) event.sender.send('selected-directory', files)
//   })
// })

const AddListBtn = ({ lists, addList }) => (
  <FloatingActionButton
    style={style}
    id="selected-directory"
    onClick={(event) => {
      // console.log('ipc', ipc);
      // ipc.send('open-file-dialog');

      addList('test', 'testLocation');
      dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections']
      });
      // ipc.on('selected-directory', function (event, path) {
      //   document.getElementById('selected-file').innerHTML = `You selected: ${path}`
      // })
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
    addList: (index, name, location) => dispatch(addList(index, name, location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddListBtn);
