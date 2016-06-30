export function setSyncOutputTypes(index, isChecked, extension) {
  return {
    type: 'SET_SYNC_FOLDER_TYPES',
    index,
    isChecked,
    extension
  };
}
