import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import { processing, cancelBuild， toggleSnackbar } from '../../action/list';
// import { processing, cancelBuild } from '../../action/list';
import { connect } from 'react-redux';
import kill from 'tree-kill';
import { exec } from 'child_process';
import { remote } from 'electron';
import { curPath } from './add-list-btn';
import Snackbar from 'material-ui/lib/Snackbar';
// var spawn =  require('child_process').exec;// import actionListBtns from '../../action/action-list-btns';

const { dialog } = remote;

const style = {
  'margin': '0 4px'
}


const cwd = remote.app.getAppPath();

const ListBtns = ({btns, listId, listLocation, snackbar, onProcess, cancelBuild, toggleSnackbar}) => (
  <div className="btn-group btn-group__right">
    {
      btns.map((btn, i) => (
        <RaisedButton
          key={i}
          className="btn"
          style={style}
          label={ btn.get('name') }
          primary={btn.get('process')}
          primary={btn.get('fail')}
          pid={btn.get('pid')}
          onClick={() => {
            process.env.PATH = process.env.PATH + ':/usr/local/bin';

            if (btn.get('process')) {
              kill(btn.get('pid'));
            } else {
              let child = exec(`gulp ${btn.get('cmd')} --cwd ${listLocation} ${btn.get('flag')} --gulpfile ${cwd}/gulpfile.js`);

              child.stderr.on('data', function (data) {
                let str = data.toString();

                console.error('exec error: ' + str + '\n编译中止');
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
                console.info('编译结束');
                <Snackbar
                  open={btn.get('snackbar')}
                  message={btn.get('msg')}
                  autoHideDuration={3000}
                  onRequestClose={toggleSnackbar(listId, 'NOTICE', '编译结束', false)}
                />
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
    toggleSnackbar: (listId, title, msg, snackbar) => dispatch(cancelBuild(listId, title, msg, snackbar))
  }
}

export default connect('', mapDispatchToProps)(ListBtns);
