import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { toggleSettingsShow, setFtp } from '../../action/setting';
import { connect } from 'react-redux';
import FTP from '../task/ftp';
import { setConfig } from '../../action/config';

const isFormAllFilled = (elem, length) => {
  const data = elem.toJS();

  console.log('data', data);
  for (let i = 0, len = length; i < len; i++) {
    if (!data.value) {
      return false;
    }
  }

  return true;
}
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
        let isFtpFormAllFilled = isFormAllFilled(ftp, ftp.size);
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
