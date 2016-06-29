import store from '../store/store';
import fs from 'fs';
import { remote } from 'electron';

const cwd = remote.app.getAppPath();

export function setConfig(fileName = 'config', states = store) {
  fs.writeFile(`${cwd}/${fileName}.json`, JSON.stringify(states.toJSON()), err => {
    if (err) {
      console.log('存储失败');
      console.error(err.message);
      return;
    }
  });
}
