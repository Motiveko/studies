import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer, { AuthState } from './auth';
import authSaga from './auth/saga';

export type RootState = {
  auth: AuthState
};
const reducer = combineReducers({ auth: authReducer });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authSaga);

export default store;
