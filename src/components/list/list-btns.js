import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import { processing, cancelBuild } from '../../action/list';
import { connect } from 'react-redux';
import kill from 'tree-kill';
import { execFile, exec } from 'child_process';
import { remote } from 'electron';
import { curPath } from './add-list-btn';
import { setSnackbar } from '../../action/snackbar';

const { dialog } = remote;

const style = {
  'margin': '0 4px'
}

const cwd = remote.app.getAppPath();

const ListBtns = ({btns, listId, listLocation, onProcess, cancelBuild, setSnackbar}) => (
  <div className="btn-group btn-group__right">
    {
      btns.map((btn, i) => (
        <RaisedButton
          key={i}
          className="btn"
          style={style}
          label={ btn.get('name') }
          labelPosition="after"
          primary={btn.get('process')}
          secondary={btn.get('fail')}
          pid={btn.get('pid')}
          onClick={() => {

            if (btn.get('process')) {
              kill(btn.get('pid'));
            } else {
              //osx特性导致无法执行exec，强制写入env.path node的路径
              if (remote.process.platform == 'darwin' && !/:(\\|\/)usr\1local\1bin/g.test(remote.process.env.PATH)) {
                remote.process.env.PATH += ':/usr/local/bin';
              }

              let child = exec(`gulp ${btn.get('cmd')} --cwd ${listLocation} ${btn.get('flag')} --gulpfile ${cwd}/gulpfile.js`);

              child.stderr.on('data', function (data) {
                let str = data.toString();

                console.error('exec error: ' + str);
                kill(btn.get('pid'));
                cancelBuild(listId, i, btn.get('name'), child.pid, str, true);
                dialog.showErrorBox('Oops， 出错了', str);
              });

              child.stdout.on('data', function (data) {
                console.log(data.toString())
                onProcess(listId, i, btn.get('text'), child.pid, data.toString())
              });

              //关闭
              child.stdout.on('close', function () {
                cancelBuild(listId, i, btn.get('name'), child.pid, '编译结束', false);
                setSnackbar('编译结束');

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
//   return {
//     lists: states.lists
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    onProcess: (listId, index, name, pid, data) => dispatch(processing(listId, index, name, pid, data)),
    cancelBuild: (listId, index, name, pid, data) => dispatch(cancelBuild(listId, index, name, pid, data)),
    setSnackbar: (msg) => dispatch(setSnackbar(msg))
  }
}

export default connect('', mapDispatchToProps)(ListBtns);
