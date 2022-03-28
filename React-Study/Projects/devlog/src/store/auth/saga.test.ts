import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put, take } from 'redux-saga/effects';
import { actions, types } from ".";
import {
  callGoogleAuthApi, callLoginApi, callLogoutApi, callSignUpApi,
} from '../../service/firebase/AuthService';
import { callUpdateUserApi, getUser, User } from '../../service/firebase/UserService';
import {
  authWithGoogleSaga, getUserSaga, loginSaga, logoutSaga, signUpSaga, updateUserSaga,
} from "./saga";

const email = 'rhehdrla@naver.com';
const password = '1234';
const uid = 'uid';
const user: User = {
  uid,
  email,
  displayName: '',
  emailVerified: true,
  photoURL: '',
};
describe('loginSaga test', () => {
  const action = actions.tryLogin({ email, password });
  const gen = cloneableGenerator(loginSaga as any)();
  expect(gen.next().value).toEqual(take(types.TRY_LOGIN));
  expect(gen.next(action).value).toEqual(put(actions.setLoading(true)));
  expect(gen.next().value).toEqual(call(callLoginApi, email, password));

  test('on success callLoginApi', () => {
    const genClone = gen.clone();
    expect(genClone.next(uid).value).toEqual(put(actions.tryGetUser(uid)));
    expect(genClone.next().value).toEqual(take(types.TRY_LOGIN));
  });

  test('on fail callLoginApi', () => {
    const genClone = gen.clone();
    if (!genClone.throw) {
      throw new Error('테스트중 문제가 발생했습니다.');
    }
    expect(genClone.throw(({ message: 'user-not-found' })).value)
      .toEqual(put(actions.setError('이메일/비밀번호가 일치하지 않습니다.')));
    expect(genClone.next().value).toEqual(put(actions.setLoading(false)));
    expect(genClone.next().value).toEqual(take(types.TRY_LOGIN));
  });
});

describe('authWithGoogleSaga test', () => {
  const gen = cloneableGenerator(authWithGoogleSaga as any)();
  expect(gen.next().value).toEqual(take(types.TRY_GOOGLE_AUTH));
  expect(gen.next().value).toEqual(put(actions.setLoading(true)));
  expect(gen.next().value).toEqual(call(callGoogleAuthApi));
  test('on call api success', () => {
    const genClone = gen.clone();
    expect(genClone.next(uid).value).toEqual(put(actions.tryGetUser(uid)));

    expect(genClone.next().value).toEqual(take(types.TRY_GOOGLE_AUTH));
  });

  test('on call api fail', () => {
    const genClone = gen.clone();
    if (!genClone.throw) {
      throw new Error('테스트중 문제가 발생했습니다.');
    }
    expect(genClone.throw({ name: 'n' }).value).toEqual(put(actions.setError('구글 인증 시도중 문제가 발생하였습니다.')));
    expect(genClone.next().value).toEqual(put(actions.setLoading(false)));
  });
});

describe('getUserSaga test', () => {
  const tryGetUser = actions.tryGetUser(uid);

  const gen = cloneableGenerator(getUserSaga as any)();
  expect(gen.next().value).toEqual(take(types.TRY_GET_USER));
  expect(gen.next(tryGetUser).value).toEqual(put(actions.setLoading(true)));
  expect(gen.next().value).toEqual(call(getUser, uid));
  test('on call getUser fail', () => {
    const genClone = gen.clone();
    if (!genClone.throw) {
      throw new Error('테스트중 문제가 발생했습니다.');
    }
    expect(genClone.throw({}).value).toEqual(put(actions.setError('사용자 정보를 가져오던 중 문제가 발생하였습니다.')));
    expect(genClone.next().value).toEqual(put(actions.setLoading(false)));

    // 처음으로 회귀
    expect(genClone.next().value).toEqual(take(types.TRY_GET_USER));
  });

  test('on call getUser success', () => {
    const genClone = gen.clone();
    expect(genClone.next(user).value).toEqual(put(actions.setUser(user)));
    expect(genClone.next().value).toEqual(put(actions.setLoading(false)));

    // 처음으로 회귀
    expect(genClone.next().value).toEqual(take(types.TRY_GET_USER));
  });
});

describe('signUpSaga test', () => {
  const action = actions.trySignUp({ email, password });

  const gen = cloneableGenerator(signUpSaga as any)();
  expect(gen.next().value).toEqual(take(types.TRY_SIGN_UP));
  expect(gen.next(action).value).toEqual(put(actions.setLoading(true)));
  expect(gen.next().value).toEqual(call(callSignUpApi, email, password));
  test('on call signUp success', () => {
    const genClone = gen.clone();
    expect(genClone.next().value).toEqual(take(types.TRY_SIGN_UP));
  });

  test('on call signUp fail', () => {
    const genClone = gen.clone();
    if (!genClone.throw) {
      throw new Error('테스트 도중 문제가 발생하였습니다.');
    }
    expect(genClone.throw({}).value).toEqual(put(actions.setError('회원가입 처리 도중 문제가 발생하였습니다.')));
    expect(genClone.next().value).toEqual(take(types.TRY_SIGN_UP));
  });
});

describe('logoutSaga test', () => {
  const gen = cloneableGenerator(logoutSaga as any)();
  expect(gen.next().value).toEqual(take(types.TRY_LOGOUT));
  expect(gen.next().value).toEqual(put(actions.setLoading(true)));
  expect(gen.next().value).toEqual(call(callLogoutApi));
  test('on call logout success', () => {
    const genClone = gen.clone();
    expect(genClone.next().value).toEqual(take(types.TRY_LOGOUT));
  });
  test('on call logout fail', () => {
    const genClone = gen.clone();
    if (!genClone.throw) {
      throw new Error('테스트 도중 문제가 발생하였습니다.');
    }
    expect(genClone.throw().value).toEqual(put(actions.setError('로그아웃 처리 도중 문제가 발생하였습니다.')));
    expect(genClone.next().value).toEqual(put(actions.setLoading(false)));
    expect(genClone.next().value).toEqual(take(types.TRY_LOGOUT));
  });
});

describe.only('updateUserSaga test', () => {
  const gen = cloneableGenerator(updateUserSaga as any)();
  const action = actions.tryUpdateUser(user);

  expect(gen.next().value).toEqual(take(types.TRY_UPDATE_USER));
  expect(gen.next(action).value).toEqual(put(actions.setLoading(true)));
  expect(gen.next().value).toEqual(call(callUpdateUserApi, user));
  test('on call updateUser success', () => {
    const genClone = gen.clone();
    expect(genClone.next().value).toEqual(put(actions.tryGetUser(uid)));
    expect(genClone.next().value).toEqual(take(types.TRY_UPDATE_USER));
  });

  test('on call updateUser fail', () => {
    const genClone = gen.clone();
    if (!genClone.throw) {
      throw new Error('테스트중 문제가 발생했습니다.');
    }
    expect(genClone.throw({}).value).toEqual(put(actions.setError('사용자 정보 수정 처리중 문제가 발생하였습니다.')));
    expect(genClone.next().value).toEqual(put(actions.setLoading(false)));
    expect(genClone.next().value).toEqual(take(types.TRY_UPDATE_USER));
  });
});
