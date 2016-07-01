import Toggle from 'material-ui/Toggle';
import { toggleJsMinify } from '../../action/task/js-minify';
import { connect } from 'react-redux';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
};

const JsMinify = ({ jsMinify, toggleJsMinify }) => (
  <div className="setting-mod_item">
    <h3 className="setting-mod_title">JS压缩配置</h3>
    <div className="setting-mod_bd" style={styles.block}>
      <Toggle
        label="是否压缩JS"
        defaultToggled={jsMinify}
        style={styles.toggle}
        onToggle={(obj, value) => toggleJsMinify(value)}
      />
    </div>
  </div>
);

const mapStateToProps = state => ({
  jsMinify: state.setting.get('jsMinify')
});

const mapDispatchToProps = dispatch => ({
  toggleJsMinify(value) {
    dispatch(toggleJsMinify(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(JsMinify);
