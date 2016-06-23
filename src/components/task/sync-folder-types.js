import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';

const style = {
  width: 'auto'
};
const SyncFolderTypes = ({ types }) => (
  <div className="checkbox-group">
    <h5 className="checkbox-group_title">复制到指定文件夹文件类型（默认复制css, img，其他功能开发中）</h5>
    <div className="checkbox-group_bd">
      {
        types.map((type, i) => (
          <Checkbox
            className="checkbox"
            key={i}
            label={type.get('name')}
            defaultChecked={type.get('defaultChecked')}
            disabled={true}
            style={style}
          />
        ))
      }
    </div>
  </div>
);

const mapStateToProps = states => ({
  types: states.setting.get('syncFolderTypes')
});

export default connect(mapStateToProps)(SyncFolderTypes);
