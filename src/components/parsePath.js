import fs from 'fs';
import path from 'path';

const ignoreFolder = 'less|css|temp|im.*|js|lib*?|inc|psd'; //排除路径的文件夹地址

/**
 * 排除less，img，css，js等文件夹的正则
 * @param  {string} str match folders
 * @return {string}     return regexp
 */
export function reg (str, containAfter = false) {
  return new RegExp('(\/|\\\\)(' + str + ')' + (containAfter ? '.*' : ''), 'gmi');
}

/**
 * detect whether this current folder contain src
 * @return {[type]} [description]
 */
export function detectSrcFolder (currentPath) {
  try {
    return fs.lstatSync(currentPath + '/src').isDirectory();
  } catch (err) {
    return false;
  }
}

export function getFolderName(curPath, isFile = false) {
  if (isFile) {
    return curPath.replace(/[^\/]+$/, '');
  } else {
    return curPath.match(/[^\/]+$/g);
  }
}

/**
 * 格式化路径
 * @param  {[typ;e]} file        [description]
 * @param  {[type]} development [description]
 * @return {[type]}             [description]
 */
export function parsePath (curPath, development = false) {
  let workingDir,
    loc = {
      src: 'src',
      dev: 'tc_dev',
      dist: 'tc_idc'
    },
    src,
    dist,
    isLottery,
    lotteryPath;

  if (detectSrcFolder(curPath) || reg(loc.src + '|' + loc.dev + '|' + loc.dist).test(curPath)) {
    isLottery = reg('lottery\\1v3\\1').test(curPath);
    lotteryPath = isLottery ? curPath.match(reg('(wx|m(qq)?)\\1?')) : '';
    workingDir = curPath.replace(reg(loc.src + '|' + loc.dev + '|' + loc.dist, true), '');
    src = workingDir + '/' + loc.src + lotteryPath;
    dist = workingDir + (development == 'dev' ? '/' + loc.dev : '/' + loc.dist) + lotteryPath;
  } else {
    workingDir = curPath.replace(reg(ignoreFolder, true), '');
    src = workingDir;
    dist = workingDir + '/dist';
  }

  return {
    folderName: getFolderName(workingDir),
    workingDir: path.normalize(workingDir),
    src: path.normalize(src),
    dist: path.normalize(dist)
  }
}
