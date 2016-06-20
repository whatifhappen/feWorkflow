import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { toggleSettingsShow, setFtp } from '../../action/setting';
import { connect } from 'react-redux';
import FTP from '../task/ftp';

const DialogSetting = ({ settings, toggleSettingsShow }) => {
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
        setFtp({
          server,
          port,
          name,
          pass,
          path });
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
        <div className="setting-mod">
          <FTP />
        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = states => ({
  settings: states.settings
});

const mapDispatchToProps = dispatch => ({
  toggleSettingsShow: show => dispatch(toggleSettingsShow(show)),
  setFtp: ({ server, port, name, pass, path }) => dispatch(setFtp({ server, port, name, pass, path }))
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogSetting);
