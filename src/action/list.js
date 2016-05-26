export function addList (index, name, loc) {
  return {
    index,
    type: 'ADD_LIST',
    name,
    loc
  }
}