import { exec } from 'child_process';

export function processing(index, name, pid, data) {
  return {
    index,
    type: 'PROCESSING',
    name,
    pid,
    process: true,
    data
  }
}

export function cancelBuild(index, text, pid, data) {
  return {
    index,
    type: 'CANCEL_BUILD',
    text,
    pid: '',
    process: false,
    data
  }
}

export function runGulp (index, name, text) {
  process.env.PATH = process.env.PATH + ':/usr/local/bin';

  var child = exec('gulp --cwd  /Users/TEN/Sites/Code/sandbox/gulp-ui/ --require  /Users/TEN/Sites/Code/sandbox/gulp-ui/node_modules --gulpfile /Users/TEN/Sites/Code/sandbox/gulp-ui/gulpfile.js');

  console.log('run from action')
  child.stderr.on('data', function (data) {
    console.log(data.toString())
    return {
      index,
      type: 'CANCEL_BUILD',
      name,
      text,
      pid: '',
      process: true,
      content: date.toString()
    };
  });

  child.stdout.on('data', function (data) {
    console.log(data.toString())
    return {
      index,
      type: 'PROCESSING',
      name,
      text,
      pid: child.pid,
      process: false,
      content: data.toString()
    };
  });
}