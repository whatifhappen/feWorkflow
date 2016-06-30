import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import { setSyncOutputTypes, removeSyncOutputTypes } from '../../action/task/sync-folder-types';

const style = {
  width: 'auto'
};
const SyncFolderTypes = ({ types, setSyncOutputTypes }) => (
  <div className="checkbox-group">
    <h5 className="checkbox-group_title">复制到指定文件夹文件类型</h5>
    <div className="checkbox-group_bd">
      {
        types.map((type, i) => (
          <Checkbox
            className="checkbox"
            key={i}
            label={type.get('name')}
            defaultChecked={type.get('defaultChecked')}
            style={style}
            onCheck={(event, isChecked) => {
              setSyncOutputTypes(i, isChecked, type.get('extension'));
            }}
          />
        ))
      }
    </div>
  </div>
);

const mapStateToProps = states => ({
  types: states.setting.get('syncFolderTypes')
});

const mapDispatchToProps = dispatch => ({
  setSyncOutputTypes(index, defaultChecked, extention) {
    dispatch(setSyncOutputTypes(index, defaultChecked, extention));
  },
  removeSyncOutputTypes(index) {
    dispatch(removeSyncOutputTypes(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SyncFolderTypes);
