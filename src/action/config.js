import { fromJS, Iterable } from 'immutable';
import store from '../store/store';
import fs from 'fs';
import { remote } from 'electron';

const cwd = remote.app.getAppPath();

export const getConfig = (fileName = 'config') => {
  fs.readFile(`${cwd}/${fileName}.json`, (err, data) => {
    if (err) {
      throw err;
    }

    const value = fromJS(JSON.parse(data), (key, value) => {
      const isIndexed = Iterable.isIndexed(value);
      return isIndexed ? value.toList() : value.toMap();
    })
    console.log('value', value);
    return value;
  });
};

export const setConfig = (fileName = 'config', states = store) => {
  fs.writeFile(`${cwd}/${fileName}.json`, JSON.stringify(states.toJSON()), err => {
    if (err) {
      console.log('存储失败');
      console.error(err.message);
      return;
    }
  });
};
