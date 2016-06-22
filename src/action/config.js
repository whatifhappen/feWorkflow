import { fromJS, Iterable } from 'immutable';
import store from '../store/store';
import fs from 'fs';
import { remote } from 'electron';

const cwd = remote.app.getAppPath();

export const getConfig = (fileName = 'config') => {
  fs.readFile(`${cwd}/${fileName}.json`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    return fromJS(JSON.parse(data), (key, value) => {
      const isIndexed = Iterable.isIndexed(value);
      return isIndexed ? value.toList() : value.toMap();
    });
  });
};

export const setConfig = (fileName = 'config', states = store) => {
  fs.writeFile(`${cwd}/${fileName}.json`, JSON.stringify(states.toJSON()), err => {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.error(err.message);
      return;
    }
  });
};
