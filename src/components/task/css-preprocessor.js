import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { setCssPreprocessor } from '../../action/task/css-preprocessor';
import { connect } from 'react-redux';

const CssPreprocessor = ({ preprocessor, setCssPreprocessor }) => (
  <div className="setting-mod_item">
    <h3 className="setting-mod_title">选择CSS预编译</h3>
    <div className="setting-mod_bd">
      <RadioButtonGroup
        name="preprocessor"
        defaultSelected={preprocessor}
        onChange={(event, value) => setCssPreprocessor(value)}
      >
        <RadioButton
          value="less"
          label="less"
          />
        <RadioButton
          value="sass"
          label="sass"
          />
      </RadioButtonGroup>
    </div>
  </div>
);

const mapStateToProps = state => ({
  preprocessor: state.setting.get('cssPreprocessor')
});

const mapDispatchToProps = dispatch => ({
  setCssPreprocessor(value) {
    dispatch(setCssPreprocessor(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CssPreprocessor);
