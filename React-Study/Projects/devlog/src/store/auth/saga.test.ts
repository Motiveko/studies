import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put, take } from 'redux-saga/effects';
import { actions, types } from ".";
import { callGoogleAuthApi, callLoginApi } from '../../service/firebase/AuthService';
import { getUser, User } from '../../service/firebase/UserService';
import { authWithGoogle, login } from "./saga";

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
describe('login test', () => {
  const action = actions.tryLogin({ email, password });
  const gen = cloneableGenerator(login as any)();
  expect(gen.next().value).toEqual(take(types.TRY_LOGIN));
  expect(gen.next(action).value).toEqual(put(actions.setLoading(true)));
  expect(gen.next().value).toEqual(call(callLoginApi, email, password));

  test('on success callLoginApi', () => {
    const genClone = gen.clone();
    expect(genClone.next(uid).value).toEqual(call(getUser, uid));
    expect(genClone.next(user).value).toEqual(put(actions.setUser(user)));
    expect(genClone.next().value).toEqual(put(actions.setLoading(false)));
  });

  test('on fail callLoginApi', () => {
    const genClone = gen.clone();
    if (!genClone.throw) {
      throw new Error('테스트중 문제가 발생했습니다.');
    }
    expect(genClone.throw(({ message: 'user-not-found' })).value)
      .toEqual(put(actions.setError('이메일/비밀번호가 일치하지 않습니다.')));
    expect(genClone.next().value).toEqual(put(actions.setLoading(false)));
  });
  test('on fail getUser', () => {
    const genClone = gen.clone();
    if (!genClone.throw) {
      throw new Error('테스트중 문제가 발생했습니다.');
    }
    expect(genClone.next(uid).value).toEqual(call(getUser, uid));
    const message = 'fail on call getUser';
    expect(genClone.throw({ message }).value)
      .toEqual(put(actions.setError(message)));
    expect(genClone.next().value).toEqual(put(actions.setLoading(false)));
  });
});

describe.only('authWithGoogle test', () => {
  const gen = cloneableGenerator(authWithGoogle as any)();
  expect(gen.next().value).toEqual(take(types.TRY_GOOGLE_AUTH));
  expect(gen.next().value).toEqual(put(actions.setLoading(true)));
  expect(gen.next().value).toEqual(call(callGoogleAuthApi));
  test('on call api success', () => {
    const genClone = gen.clone();
    expect(genClone.next(uid).value).toEqual(call(getUser, uid));
    expect(genClone.next(user).value).toEqual(put(actions.setUser(user)));
    expect(genClone.next().value).toEqual(put(actions.setLoading(false)));
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
