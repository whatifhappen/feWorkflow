import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import { cancelBuild, processing } from '../../action/action-list-btns';
import { connect } from 'react-redux';
// import actionListBtns from '../../action/action-list-btns';

import '../../../css/style.less';

const style = {
  margin: 4
}

const ListBtns = ({btns, onProcess, cancelBuild}) => (
  <div className="btn-group btn-group__right">
    {
      btns.map((btn, i) => (
        <RaisedButton
          key={i}
          label={btn.get('name')}
          primary={btn.get('process')}
          style={style}
          onClick={() => {
            if (btn.get('process')) {
              cancelBuild(btn.get('index'), btn.get('text'));
            } else {
              onProcess(btn.get('index'), btn.get('name'));
            }
          }}
        />
      ))
    }
  </div>
);

function mapStateToProps(btns) {
  return {
    btns
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cancelBuild: (index, text) => dispatch(cancelBuild(index, text)),
    onProcess: (index, name) => dispatch(processing(index, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBtns);
