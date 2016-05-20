import spawn from 'child_process';

export function cancelBuild(index, name, isProcess) {
  return {
    index,
    type: 'CANCEL_BUILD',
    name,
    process: false
  }
}

export function processing(index) {
  return {
    index,
    type: 'PROCESSING',
    text: '编译中...',
    process: true
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
