import TextField from 'material-ui/TextField';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import { setFtp } from '../../action/setting';

const FTP = ({ ftp, setFtp }) => (
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
            onBlur={(e) => {
              setFtp(i, e.target.value);
            }}
          />
        ))
      }
    </div>
  </div>
);

const mapStateToProps = states => ({
  ftp: states.setting.get('ftp')
});

const mapDispatchToProps = dispatch => ({
  setFtp: (index, value) => dispatch(setFtp(index, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(FTP);
