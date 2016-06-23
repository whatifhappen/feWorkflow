/**
 * 从表单设置ftp数据写入store
 * @param {[type]} index [description]
 * @param {[type]} value [description]
 */
export function setFtp(index, value) {
  return {
    type: 'SET_FTP',
    index,
    value
  };
}

/**
 * 从config.json回滚ftp数据重设表单
 * @param {[type]} index        [description]
 * @param {[type]} defaultValue [description]
 */
export function resetFtp(index, defaultValue) {
  return {
    type: 'RESET_FTP',
    index,
    defaultValue
  };
}
