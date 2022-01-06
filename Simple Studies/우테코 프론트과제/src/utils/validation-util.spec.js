import { validateCharge } from './validation-util';

describe('validation util', () => {
  beforeEach(() => {});

  test('validateCharge 테스트', () => {
    expect(() => validateCharge('ㅎㅎ')).toThrow();
    expect(() => validateCharge('abc')).toThrow();
    expect(() => validateCharge(9)).toThrow();
    expect(() => validateCharge(13)).toThrow();
  });
});
