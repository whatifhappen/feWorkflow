import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import { processing, cancelBuild } from '../../action/list-btns';
import { connect } from 'react-redux';
import kill from 'tree-kill';
import { exec } from 'child_process';
// var spawn =  require('child_process').exec;// import actionListBtns from '../../action/action-list-btns';

const style = {
  'margin': '0 4px'
}

const ListBtns = ({btns, onProcess, cancelBuild}) => (
  <div className="btn-group btn-group__right">
    {
      btns.map((btn, i) => (
        <RaisedButton
          key={i}
          className="btn"
          style={style}
          label={btn.get('name')}
          primary={btn.get('process')}
          primary={btn.get('fail')}
          pid={btn.get('pid')}
          onClick={() => {
            if (btn.get('process')) {
              kill(btn.get('pid'));
            } else {
                process.env.PATH = process.env.PATH + ':/usr/local/bin';
                var child = exec('gulp --cwd  /Users/TEN/Sites/Code/sandbox/gulp-ui/ --require  /Users/TEN/Sites/Code/sandbox/gulp-ui/node_modules --gulpfile /Users/TEN/Sites/Code/sandbox/gulp-ui/gulpfile.js');

                child.stderr.on('data', function (data) {
                  console.error('exec error: ' + data.toString() + '\n编译中止');
                  kill(btn.get('pid'));
                  cancelBuild(i, btn.get('name'), child.pid, data.toString(), true);
                });

                child.stdout.on('data', function (data) {
                  console.log(data.toString())
                  onProcess(i, btn.get('text'), child.pid, data.toString())
                });

                //关闭
                child.stdout.on('close', function () {
                  cancelBuild(i, btn.get('name'), child.pid, '编译结束', false);
                  console.info('编译结束');
                });
            }
          }}
        />
      ))
    }
  </div>
);

function mapStateToProps(states) {
  return {
    btns: states.listBtns
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onProcess: (index, name, pid, data) => dispatch(processing(index, name, pid, data)),
    cancelBuild: (index, name, pid, data) => dispatch(cancelBuild(index, name, pid, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBtns);
