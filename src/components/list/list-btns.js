import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import { processing, cancelBuild } from '../../action/action-list-btns';
import { connect } from 'react-redux';
import * as kill from 'tree-kill';
import { exec } from 'child_process';
// var spawn =  require('child_process').exec;// import actionListBtns from '../../action/action-list-btns';

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
          pid={btn.get('pid')}
          style={style}
          onClick={() => {
            if (btn.get('process')) {
              kill(btn.get('pid'));
            } else {
              process.env.PATH = process.env.PATH + ':/usr/local/bin';

                var child = exec('gulp --cwd  /Users/TEN/Sites/Code/sandbox/gulp-ui/ --require  /Users/TEN/Sites/Code/sandbox/gulp-ui/node_modules --gulpfile /Users/TEN/Sites/Code/sandbox/gulp-ui/gulpfile.js');

                child.stderr.on('data', function (data) {
                  console.error('exec error: ' + data.toString());
                  kill(btn.get('pid'));
                  cancelBuild(i, btn.get('name'), child.pid, data.toString());
                });

                child.stdout.on('data', function (data) {
                  console.log(data.toString())
                  onProcess(i, btn.get('text'), child.pid, data.toString())
                });

                //关闭
                child.stdout.on('close', function () {
                  // if (error !== null) {
                  // console.log('reset in close.');
                  // kill();
                  console.log(btn.get('pid'))
                  cancelBuild(i, btn.get('name'), child.pid, '编译结束');
                  console.info('exec end: 编译结束');
                });
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
    onProcess: (index, name, pid, data) => dispatch(processing(index, name, pid, data)),
    cancelBuild: (index, name, pid, data) => dispatch(cancelBuild(index, name, pid, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBtns);
