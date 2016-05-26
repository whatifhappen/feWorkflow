/**
 * 排除less，img，css，js等文件夹的正则
 * @param  {string} str match folders
 * @return {string}     return regexp
 */
export function reg (str, containAfter) {
  return new RegExp('(\/|\\\\)(' + str + ')' + (containAfter ? '.*' : ''), 'gmi');
}

/**
 * detect whether this current folder contain src
 * @return {[type]} [description]
 */
export function detectSrcFolder (currentPath) {
  try {
    return fs.lstatSync(currentPath + '/tc_idc').isDirectory();
  } catch (err) {
    return false;
  }
}

/**
 * 格式化路径
 * @param  {[typ;e]} file        [description]
 * @param  {[type]} development [description]
 * @return {[type]}             [description]
 */
export function parsePath (file, development) {
  var _path = file.path || file,
    workingDir,
    settings = getSettings(),
    loc = settings.location,
    src,
    dist,
    isLottery,
    lotteryPath;

  if (detectSrcFolder(_path) || reg(loc.src + '|' + loc.dev + '|' + loc.dist).test(_path)) {
    isLottery = reg('lottery\\1v3\\1').test(_path);
    lotteryPath = isLottery ? _path.match(reg('(wx|m(qq)?)\\1?')) : '';
    workingDir = _path.replace(reg(loc.src + '|' + loc.dev + '|' + loc.dist), '');
    src = workingDir + '/' + loc.src + lotteryPath;
    dist = workingDir + (development == 'dev' ? '/' + loc.dev : '/' + loc.dist) + lotteryPath;
  } else {
    workingDir = _path.replace(reg(ignoreFolder, true), '');
    src = workingDir;
    dist = workingDir + '/dist';
  }

  return {
    workingDir: path.normalize(workingDir),
    src: path.normalize(src),
    dist: path.normalize(dist)
  }
}
