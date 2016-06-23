import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { toggleSettingsShow } from '../../action/setting';
import { connect } from 'react-redux';
import FTP from '../task/ftp';
import SyncFolder from '../task/sync-folder';
import { setConfig } from '../../action/config';


const DialogSetting = ({ setting, ftp, toggleSettingsShow, setConfig }) => {
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
        toggleSettingsShow(false);
        setConfig('config', setting);
      }}
    />,
  ];

  return (
    <div>
      <Dialog
        title="设置"
        actions={actions}
        modal={false}
        open={setting.get('showSettings')}
        onRequestClose={() => toggleSettingsShow(false)}
        autoScrollBodyContent={true}
      >
        <div className="setting-mod">
          <FTP />
          <SyncFolder />
        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = states => ({
  setting: states.setting,
  ftp: states.setting.get('ftp')
});

const mapDispatchToProps = dispatch => ({
  toggleSettingsShow: show => dispatch(toggleSettingsShow(show)),
  setConfig: (fileName, states) => setConfig(fileName, states)
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogSetting);
