import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import { cancelBuild, processing } from '../../action/action-list-btns';
import { connect } from 'react-redux';
var spawn =  require('child_process').exec;
var kill = require('tree-kill');
// import actionListBtns from '../../action/action-list-btns';

const style = {
  margin: 4
}

const runGulp = ({isProces, name, index, text, cancelBuild, onProcess}) => {
  process.env.PATH = process.env.PATH + ':/usr/local/bin';


  // var child = spawn('gulp', {env: {"ATOM_SHELL_INTERNAL_RUN_AS_NODE":"1"}});
  var child = spawn('gulp --cwd  /Users/TEN/Sites/Code/sandbox/gulp-ui/ --require  /Users/TEN/Sites/Code/sandbox/gulp-ui/node_modules --gulpfile /Users/TEN/Sites/Code/sandbox/gulp-ui/gulpfile.js');
  child.stderr.on('data', function (data) {
    // cancelBuild(index, text, child.pid);
    dispatch(cancelBuild(index, text))
    console.log(data.toString())
  });

  child.stdout.on('data', function (data) {
    dispatch(processing(index, name))
    // onProcess(index, name);npm
    console.log(data.toString())
  });
}

const ListBtns = ({btns}) => (
  <div className="btn-group btn-group__right">
    {
      btns.map((btn, i) => (
        <RaisedButton
          key={i}
          label={btn.get('name')}
          primary={btn.get('process')}
          pid={btn.get('pid')}
          style={style}
          onClick={() => {
            if (btn.get('process')) {
              kill(btn.get('pid'));
            } else {
              runGulp(btn.get('process'), btn.get('name'), btn.get('text'));
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

export connect(mapStateToProps)(ListBtns);
export connect(mapDispatchToProps)(runGulp);
