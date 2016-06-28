/**
 * 从表单设置folder数据写入store
 * @param {[type]} index [description]
 * @param {[type]} name [description]
 */
export function setOutputFolder(index, value) {
  return {
    type: 'SET_OUTPUT_FOLDER',
    index,
    value
  };
}
