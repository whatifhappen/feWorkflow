import { synFolderLoc } from '../../action/task/sync-folder';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import SyncFolderTypes from './sync-folder-types';

const SyncFolder = ({ syncFolder, synFolderLoc, synFolderType }) => (
  <div className="setting-mod_item">
    <h3 className="setting-mod_title">复制文件目录到另一文件夹</h3>
    <div className="setting-mod_bd">
      {
        syncFolder.map((textField, i) => (
          <TextField
            key={i}
            className="text-field"
            hintText={textField.get('name')}
            defaultValue={textField.get('location').trim()}
            floatingLabelText={textField.get('label')}
            onBlur={(e) => {
              const value = e.target.value.trim();
              synFolderLoc(i, value);
            }}
          />
        ))
      }
      <SyncFolderTypes />
    </div>
  </div>
);

const mapStateToProps = states => ({
  syncFolder: states.setting.get('syncFolder')
});

const mapDispatchToProps = dispatch => ({
  synFolderLoc: (index, loc) => dispatch(synFolderLoc(index, loc))
});

export default connect(mapStateToProps, mapDispatchToProps)(SyncFolder);
