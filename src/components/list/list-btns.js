import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import { processing, cancelBuild } from '../../action/list';
import { connect } from 'react-redux';
import kill from 'tree-kill';
import { execFile, exec } from 'child_process';
import { remote } from 'electron';
import { curPath } from './add-list-btn';
import { setSnackbar } from '../../action/snackbar';
import CircularProgress from 'material-ui/lib/circular-progress';
// var spawn =  require('child_process').exec;// import actionListBtns from '../../action/action-list-btns';

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
            process.env.PATH = process.env.PATH + ':/usr/local/bin';

            if (btn.get('process')) {
              kill(btn.get('pid'));
            } else {
              let child = execFile(process.env.PATH + '/bin/gulp',  [`${btn.get('cmd')}`, '--cwd', `${listLocation}`, `${btn.get('flag')}`, '--gulpfile' , `${cwd}/gulpfile.js`]);
              // let child = exec(`gulp ${btn.get('cmd')} --cwd ${listLocation} ${btn.get('flag')} --gulpfile ${cwd}/gulpfile.js`);

              child.stderr.on('data', function (data) {
                let str = data.toString();

                console.error('exec error: ' + str + '\n编译中止');
                kill(btn.get('pid'));
                cancelBuild(listId, i, btn.get('name'), child.pid, str, true);
                dialog.showErrorBox('Oops， 出错了。请稍候再试', str);
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
