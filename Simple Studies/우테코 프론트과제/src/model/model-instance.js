import modelFactory from './model';

const initialState = JSON.parse(window.localStorage.getItem('state'));
const localStorageListener = state => {
  console.log(Object.keys(state));
  window.localStorage.setItem('state', JSON.stringify(state));
};

const model = modelFactory(initialState);
model.addChangeListener(localStorageListener);

export default model;
