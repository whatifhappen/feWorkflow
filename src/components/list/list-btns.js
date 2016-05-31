import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import { processing, cancelBuild } from '../../action/list';
// import { processing, cancelBuild } from '../../action/list';
import { connect } from 'react-redux';
import kill from 'tree-kill';
import { exec } from 'child_process';
import { remote } from 'electron';
// var spawn =  require('child_process').exec;// import actionListBtns from '../../action/action-list-btns';

const style = {
  'margin': '0 4px'
}

const cwd = remote.app.getAppPath();

const ListBtns = ({btns, listId, onProcess, cancelBuild}) => (
  <div className="btn-group btn-group__right">
    {console.log('btns', btns.toJS())}
    {
      btns.map((btn, i) => (
        <RaisedButton
          key={i}
          className="btn"
          style={style}
          label={btn.get('btnName')}
          primary={btn.get('process')}
          primary={btn.get('fail')}
          pid={btn.get('pid')}
          onClick={() => {
            if (btn.get('process')) {
              kill(btn.get('pid'));
            } else {
              process.env.PATH = process.env.PATH + ':/usr/local/bin';
              var child = exec('gulp --cwd ' + cwd + ' --require ' + cwd + ' --gulpfile ' + cwd + '/gulpfile.js');

              child.stderr.on('data', function (data) {
                console.error('exec error: ' + data.toString() + '\n编译中止');
                kill(btn.get('pid'));
                cancelBuild(listId, i, btn.get('name'), child.pid, data.toString(), true);
              });

              child.stdout.on('data', function (data) {
                console.log(data.toString())
                onProcess(listId, i, btn.get('text'), child.pid, data.toString())
              });

              //关闭
              child.stdout.on('close', function () {
                cancelBuild(listId, i, btn.get('name'), child.pid, '编译结束', false);
                console.info('编译结束');
              });
            }
          }}
        />
      ))
    }
  </div>
);

// function mapStateToProps(states) {
//   console.log('states.lists.btns', states.listBtns.toJS());
//   console.log('states.lists', states.lists.toJS());
//
//   return {
//     btns: states.listBtns
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    onProcess: (listId, index, name, pid, data) => dispatch(processing(listId, index, name, pid, data)),
    cancelBuild: (listId, index, name, pid, data) => dispatch(cancelBuild(listId, index, name, pid, data))
  }
}

export default connect('', mapDispatchToProps)(ListBtns);
