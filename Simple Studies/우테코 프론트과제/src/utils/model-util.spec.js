import VMError from '../core/vm-error';
import { calcChangesSum, calcMinimumChanges, getRandomChanges, mergeChanges } from './model-util';

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

  test('calcChangesSum - 잔돈의 합계를 계산한다', () => {
    const charge = 1500;
    const changes = getRandomChanges(charge);
    expect(charge).toBe(calcChangesSum(changes));
  });
  test('calcMinimumChanges - 동전이 모지라면 Error', () => {
    const changes = {
      500: 10,
      100: 10,
      50: 10,
      10: 0
    };
    const charge = 1010;
    expect(() => calcMinimumChanges(changes, charge)).toThrow(
      new VMError('가진 잔돈으로 잔돈을 거슬러 줄 수 없습니다.')
    );
  });

  test('calcMinimumChanges - 최소한의 잔돈을 반환한다.', () => {
    const changes = {
      500: 3,
      100: 10,
      50: 10,
      10: 13
    };
    const charge = 2600;
    const minChanges = calcMinimumChanges(changes, charge);
    expect(minChanges[500]).toBe(3);
    expect(minChanges[100]).toBe(10);
    expect(minChanges[50]).toBe(2);
    expect(minChanges[10]).toBe(0);
  });

  test('mergeChanges - 잔돈을 합친다 테스트', () => {
    const changes1 = {
      500: 3,
      100: 2,
      50: 0,
      10: 2
    };
    const changes2 = {
      500: 0,
      100: 3,
      50: 2,
      10: 3
    };

    const mergedChanges = mergeChanges(changes1, changes2);
    expect(mergedChanges[500]).toBe(3);
    expect(mergedChanges[100]).toBe(5);
    expect(mergedChanges[50]).toBe(2);
    expect(mergedChanges[10]).toBe(5);
  });
});
