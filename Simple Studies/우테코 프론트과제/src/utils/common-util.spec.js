import { add, hasOwnProperties } from './common-util';

describe('common-util', () => {
  test('hasOwnProperties 테스트', () => {
    const obj = { a: 1, b: 2, c: 3 };

    expect(hasOwnProperties(obj, ['a', 'b', 'c'])).toBe(true);
    expect(hasOwnProperties(obj, ['a', 'b', 'd'])).toBe(false);
    expect(hasOwnProperties(obj, ['a', 'b', 'c,', 'd'])).toBe(false);
  });

  test('add - string을 넣어도 숫자로 취급해야한다. 테스트', () => {
    const a = '01000';
    const b = 1000;
    expect(add(a, b)).toBe(2000);
  });
});
