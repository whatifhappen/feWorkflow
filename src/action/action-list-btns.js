function actionListBtns(store, action, text = 'processing...') {
  store.dispatch({
    type: action.type,
    text: text,
    
  });
}
