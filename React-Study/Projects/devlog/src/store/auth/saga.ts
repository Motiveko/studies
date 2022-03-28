import {
  all, call, fork, put, take,
} from 'redux-saga/effects';
import { actions, types } from '.';
import { callGoogleAuthApi, callLoginApi } from '../../service/firebase/AuthService';
import { getUser, User } from '../../service/firebase/UserService';

export function* login() {
  while (true) {
    const { payload: { email, password } } = yield take(types.TRY_LOGIN);
    yield put(actions.setLoading(true));
    try {
      const uid: string = yield call(callLoginApi, email, password);
      const user: User = yield call(getUser, uid);
      yield put(actions.setUser(user));
    } catch (error: any) {
      console.error(error);
      const message = getLoginErrorMessage(error);
      yield put(actions.setError(message));
    }
    yield put(actions.setLoading(false));
  }
}

export function* authWithGoogle() {
  while (true) {
    yield take(types.TRY_GOOGLE_AUTH);
    yield put(actions.setLoading(true));
    try {
      const uid: string = yield call(callGoogleAuthApi);
      const user: User = yield call(getUser, uid);
      yield put(actions.setUser(user));
    } catch (error: any) {
      console.error(error);
      yield put(actions.setError('구글 인증 시도중 문제가 발생하였습니다.'));
    }
    yield put(actions.setLoading(false));
  }
}

const getLoginErrorMessage = (error: any) => {
  let message = (error.message as string) || '로그인 중 문제가 발생하였습니다.';
  const serverEmailPasswordValidationError = /(wrong-password)|(user-not-found)/i;
  if (serverEmailPasswordValidationError.test(message)) {
    message = '이메일/비밀번호가 일치하지 않습니다.';
  }
  return message;
};

export default function* watcher() {
  yield all([fork(login), fork(authWithGoogle)]);
}
