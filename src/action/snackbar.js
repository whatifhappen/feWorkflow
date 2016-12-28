/**
 * toggle show/hidden of snackbar
 * @param  {string} title 名称
 * @param  {string} msg   提示内容
 * @param  {boolean} state 是否显示snackbar
 * @return {object}       返回action
 */
export function setSnackbar(msg) {
  return {
    msg,
    open: true,
    type: 'SET_SNACKBAR',
  }
}

export function closeSnackbar() {
  return {
    open: false,
    type: 'CLOSE_SNACKBAR'
  }
}
