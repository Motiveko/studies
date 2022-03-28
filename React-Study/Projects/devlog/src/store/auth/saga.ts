import {
  all, call, fork, put, take,
} from 'redux-saga/effects';
import { actions, types } from '.';
import { callGoogleAuthApi, callLoginApi, callSignUp } from '../../service/firebase/AuthService';
import { getUser, User } from '../../service/firebase/UserService';

export function* loginSaga() {
  while (true) {
    const { payload: { email, password } } = yield take(types.TRY_LOGIN);
    yield put(actions.setLoading(true));
    try {
      const uid: string = yield call(callLoginApi, email, password);
      yield put(actions.tryGetUser(uid));
    } catch (error: any) {
      console.error(error);
      const message = getLoginErrorMessage(error);
      yield put(actions.setError(message));
      yield put(actions.setLoading(false));
    }
  }
}

export function* getUserSaga() {
  while (true) {
    const { payload } = yield take(types.TRY_GET_USER);
    yield put(actions.setLoading(true));
    try {
      const user: User = yield call(getUser, payload);
      yield put(actions.setUser(user));
    } catch (error: any) {
      console.error(error);
      yield put(actions.setError('사용자 정보를 가져오던 중 문제가 발생하였습니다.'));
    }

    yield put(actions.setLoading(false));
  }
}

export function* authWithGoogleSaga() {
  while (true) {
    yield take(types.TRY_GOOGLE_AUTH);
    yield put(actions.setLoading(true));
    try {
      const uid: string = yield call(callGoogleAuthApi);
      yield put(actions.tryGetUser(uid));
    } catch (error: any) {
      console.error(error);
      yield put(actions.setError('구글 인증 시도중 문제가 발생하였습니다.'));
      yield put(actions.setLoading(false));
    }
  }
}

export function* signUpSaga() {
  while (true) {
    const { payload: { email, password } } = yield take(types.TRY_SIGN_UP);
    yield put(actions.setLoading(true));
    try {
      yield call(callSignUp, email, password);
    } catch (error: any) {
      console.error(error);
      yield put(actions.setError('회원가입 처리 도중 문제가 발생하였습니다.'));
    }
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
  yield all([fork(loginSaga), fork(authWithGoogleSaga), fork(getUserSaga)]);
}
