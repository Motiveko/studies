import modelFactory from './model';

const initialState = JSON.parse(window.localStorage.getItem('state'));
const localStorageListener = state => {
  window.localStorage.setItem('state', JSON.stringify(state));
};

const model = modelFactory(initialState);
model.addChangeListener(localStorageListener);

export default model;
