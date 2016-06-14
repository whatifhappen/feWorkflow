import { closeSnackbar } from '../../action/snackbar';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

const SnackbarMod = ({snackbar, closeSnackbar}) => (
  <Snackbar
    open={snackbar.get('open')}
    message={snackbar.get('msg')}
    autoHideDuration={3000}
    onRequestClose={() => closeSnackbar()}
  />
);

function mapStateToProps(state) {
  return {
    snackbar: state.snackbar
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeSnackbar: () => dispatch(closeSnackbar())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarMod);
