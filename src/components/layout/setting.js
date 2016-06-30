import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { toggleSettingsShow } from '../../action/setting';
import { connect } from 'react-redux';
import OutputFolder from '../task/output-folder';
import FTP from '../task/ftp';
import SyncFolder from '../task/sync-folder';
import { setConfig } from '../../action/config';
import CssPreprocessor from '../task/css-preprocessor';

const DialogSetting = ({ setting, toggleSettingsShow, setConfig }) => {
  const actions = [
    <FlatButton
      label="取消"
      primary={true}
      onClick={() => toggleSettingsShow(false)}
    />,
    <FlatButton
      label="保存"
      primary={true}
      keyboardFocused={true}
      onClick={() => {
        setConfig('config', setting);
        toggleSettingsShow(false);
      }}
    />,
  ];

  return (
    <div>
      <Dialog
        title="设置(开发中)"
        actions={actions}
        modal={false}
        open={setting.get('showSettings')}
        onRequestClose={() => toggleSettingsShow(false)}
        autoScrollBodyContent={true}
      >
        <div className="setting-mod">
          <OutputFolder />
          <FTP />
          <SyncFolder />
          <CssPreprocessor />
        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = states => ({
  setting: states.setting
});

const mapDispatchToProps = dispatch => ({
  toggleSettingsShow: show => dispatch(toggleSettingsShow(show)),
  setConfig: (fileName, states) => setConfig(fileName, states)
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogSetting);
