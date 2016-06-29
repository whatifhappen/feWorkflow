/**
 * 设置需要同步文件夹的本地目录
 * @param  {[type]} location [description]
 * @return {[type]}          [description]
 */
export function synFolderLoc(index, location) {
  return {
    type: 'SET_SYNC_FOLDER',
    index,
    location
  }
}

/**
 * 设置需要同步文件类型
 * @param  {[type]} location [description]
 * @return {[type]}          [description]
 */
export function synFolderLocType(type) {
  return {
    type: 'SET_SYNC_FOLDER_TYPE',
    type
  }
}
