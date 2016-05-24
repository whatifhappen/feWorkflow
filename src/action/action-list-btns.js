import spawn from 'child_process';

export function processing(index, name) {
  return {
    index,
    type: 'PROCESSING',
    name,
    process: true
  }
}

export function cancelBuild(index, text) {
  return {
    index,
    type: 'CANCEL_BUILD',
    name: text,
    process: false
  }
}

export function runGulp(cmd) {
  var child = spawn('gulp' + cmd);

  child.stderr.on('data', function (data) {
    console.log(data.toString())
  });

  child.stdout.on('data', function (data) {
    console.log(data.toString())
  });
}
