import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { setOutputFolder } from '../../action/task/output-folder';

const OutputFolder = ({ output, setOutputFolder }) => (
  <div className="setting-mod_item">
    <h3 className="setting-mod_title">输出文件夹设置</h3>
    <div className="setting-mod_bd">
      {
        output.map((btn, i) => (
          <TextField
            key={i}
            className="text-field text-field__sm"
            defaultValue={btn.get('value').trim() || btn.get('defaultValue')}
            hintText={btn.get('name')}
            floatingLabelText={btn.get('label')}
            onBlur={(e) => {
              console.log('e.target.value', e.target.value)
              if (e.target.value.trim()) {
                setOutputFolder(i, e.target.value);
              }
            }}
          />
        ))
      }
    </div>
  </div>
);

const mapStateToProps = states => ({
  output: states.setting.get('outputFolder')
});

const mapDispatchToProps = dispatch => ({
  setOutputFolder: (index, name) => dispatch(setOutputFolder(index, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(OutputFolder);
