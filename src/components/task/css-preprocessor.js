import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { setCssProprecessor } from '../../action/task/css-preprocessor';
import { connect } from 'react-redux';

const CssPreprocessor = ({ btn, setCssProprecessor }) => (
  <div className="setting-mod_item">
    <h3 className="setting-mod_title">选择CSS预编译</h3>
    <div className="setting-mod_bd">
      <RadioButtonGroup
        name="preprocessor"
        defaultSelected="LESS"
        onChange={(event, value) => setCssProprecessor(value)}
      >
        <RadioButton
          value="less"
          label="LESS"
          />
        <RadioButton
          value="sass"
          label="SASS"
          />
      </RadioButtonGroup>
    </div>
  </div>
);

const mapStateToProps = state => ({
  btn: state.setting.get('cssPreprocessor');
});

const mapDispatchToProps = dispatch => ({
  setCssProprecessor(value) {
    dispatch(setCssProprecessor(value))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CssPreprocessor);
