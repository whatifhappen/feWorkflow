import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import { cancelBuild, processing } from '../../action/action-list-btns';
import { connect } from 'react-redux';
// import actionListBtns from '../../action/action-list-btns';
import spawn from 'child_process';

// const spawn = require('child_process').spawn;
// const spawn = require('electron-spawn')
// import spawn from 'electron-spawn';

function runGulp() {
  var child = spawn('gulp');

  child.stderr.on('data', function (data) {
    console.log(data.toString())
  });
  child.stdout.on('data', function (data) {
    console.log(data.toString())
  });
}

const style = {
  margin: 4
}

const ListBtns = ({btns, onProcess, cancelBuild}) => (
  <div className="btn-group btn-group__right">
    {console.log('cancelBuild', cancelBuild)}
    {
      btns.map((btn, i) => (
        <RaisedButton
          key={i}
          label={btn.name}
          primary={btn.process}
          style={style}
          onClick={()=> {
            if (btn.process) {
              cancelBuild(i, btn.name);
            } else {
              onProcess(i);
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
    cancelBuild: (index, name) => dispatch(cancelBuild(index, name)),
    onProcess: index => dispatch(processing(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBtns);
