import Toggle from 'material-ui/Toggle';
import { toggleZip } from '../../action/task/zip';
import { connect } from 'react-redux';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
};

const Zip = ({ zip, toggleZip }) => (
  <div className="setting-mod_item">
    <h3 className="setting-mod_title">Zip压缩包配置(默认生成压缩包)</h3>
    <div className="setting-mod_bd" style={styles.block}>
      <Toggle
        label="是否生成压缩包"
        defaultToggled={zip}
        style={styles.toggle}
        onToggle={(obj, value) => toggleZip(value)}
      />
    </div>
  </div>
);

const mapStateToProps = state => ({
  zip: state.setting.get('zip')
});

const mapDispatchToProps = dispatch => ({
  toggleZip(value) {
    dispatch(toggleZip(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Zip);
