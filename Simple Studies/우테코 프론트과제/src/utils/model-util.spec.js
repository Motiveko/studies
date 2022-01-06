import { getRandomChanges } from './model-util';

describe('model util test', () => {
  beforeEach(() => {
    window.MissionUtils = {
      Random: {
        pickNumberInList: range => {
          const randomIndex = Math.floor(Math.random() * range.length);
          return range[randomIndex];
        }
      }
    };
  });

  afterEach(() => {
    window.MissionUtils = undefined;
  });
  test('getRandomChanges test', () => {
    // 랜덤 관련 의존이 있으므로 10회 테스트한다.
    Array(10)
      .fill(() => '')
      .forEach(() => {
        const charge = 1500;
        const changes = getRandomChanges(charge);
        const changeSum = Object.keys(changes).reduce((acc, key) => {
          // eslint-disable-next-line no-param-reassign
          acc += key * changes[key];
          return acc;
        }, 0);
        expect(charge).toBe(changeSum);
      });
  });
});
