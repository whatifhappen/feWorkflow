import { fromJS, Iterable } from 'immutable';

export const loadState = (name = 'setting') => {
  try {
    const data = localStorage.getItem(name);

    if (data === null) {
      return undefined;
    }

    return fromJS(JSON.parse(data), (key, value) => {
      const isIndexed = Iterable.isIndexed(value);
      return isIndexed ? value.toList() : value.toMap();
    });

  } catch(err) {
    return undefined;
  }
};

export const saveState = (name = 'state', state = 'state') => {
  try {
    const serializedState = JSON.stringify(state.toJS());
    localStorage.setItem(name, serializedState);
  } catch(err) {
    console.log('err', err);
  }
}
