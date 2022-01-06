import { hasOwnProperties } from './common-util';

describe('common-util', () => {
  test('hasOwnProperties 테스트', () => {
    const obj = { a: 1, b: 2, c: 3 };

    expect(hasOwnProperties(obj, ['a', 'b', 'c'])).toBe(true);
    expect(hasOwnProperties(obj, ['a', 'b', 'd'])).toBe(false);
    expect(hasOwnProperties(obj, ['a', 'b', 'c,', 'd'])).toBe(false);
  });
});
