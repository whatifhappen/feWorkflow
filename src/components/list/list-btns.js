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
      btns.map((btn, i) => {
        return (<RaisedButton
          key={i}
          label={btn.get('name')}
          primary={btn.get('process')}
          style={style}
          onClick={()=> {
            if (btn.process) {
              cancelBuild(btn.get('index'), btn.get('name'), btn.get('process'));
            } else {
              onProcess(btn.get('index'));
            }
          }}
        />)
      })
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
    cancelBuild: process => dispatch(cancelBuild(process)),
    onProcess: index => dispatch(processing(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBtns);
