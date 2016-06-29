import ActionSettings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { toggleSettingsShow, resetFtp } from '../../action/setting';
import { getConfig } from '../../action/config';

const style = {
  position: 'absolute'
};

const Aside = ({ toggleSettingsShow, resetFtp, getConfig }) => (
  <aside className="sidebar">
    <figure className="figure figure-logo">
      <img src="img/gulp.png" alt=""/>
    </figure>

    <IconButton
      tooltip="设置"
      className="setting"
      style={style}
      tooltipPosition="top-center"
      onClick={() => {
        toggleSettingsShow(true)
      }}
    >
      <ActionSettings color="#607D8B" hoverColor="#ECEFF1" />
    </IconButton>
  </aside>
);

const mapDispatchToProps = (dispatch) => ({
  toggleSettingsShow: show => dispatch(toggleSettingsShow(show)),
  resetFtp: (index, defaultValue) => dispatch(resetFtp(index, defaultValue)),
  getConfig: name => getConfig(name)
});

export default connect('', mapDispatchToProps)(Aside);
