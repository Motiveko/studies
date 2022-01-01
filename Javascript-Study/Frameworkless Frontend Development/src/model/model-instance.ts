import modelFactory, { State } from './model';

const loadState: () => State | null = () => {
  const serializedState = window
      .localStorage
      .getItem('state');
  if(!serializedState) {
    return null;
  }
  return JSON.parse(serializedState) as State;
}

const localStorageState = loadState();
const model = modelFactory(localStorageState!);

export default () => model;