import TextField from 'material-ui/TextField';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';

const FTP = ({ ftp }) => (
  <div className="setting-mod_item">
    <h3 className="setting-mod_title">FTP设置</h3>
    <div className="setting-mod_bd">
      {
        ftp.map((btn, i) => (
          <TextField
            key={i}
            className="text-field"
            hintText={btn.get('name')}
            floatingLabelText={btn.get('label')}
          />
        ))
      }
    </div>
  </div>
);

const mapStateToProps = states => ({
  ftp: states.setting.get('ftp')
});

export default connect(mapStateToProps)(FTP);
