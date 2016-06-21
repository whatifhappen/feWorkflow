import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { toggleSettingsShow, setFtp } from '../../action/setting';
import { connect } from 'react-redux';
import FTP from '../task/ftp';
import { setConfig } from '../../action/config';

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
        toggleSettingsShow(false);
        setConfig('config', setting);
        var data = JSON.stringify()
      }}
    />,
  ];

  return (
    <div>
      <RaisedButton label="Scrollable Dialog" />
      <Dialog
        title="设置"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={() => toggleSettingsShow(false)}
        autoScrollBodyContent={true}
      >
        <form>
          <div className="setting-mod">
            <FTP />
          </div>
        </form>
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
