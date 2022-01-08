/**
 * 객체 깊은복사
 * @param {*} obj 복사할 객체
 * @returns 반환된 객체
 */
export const cloneDeep = obj => JSON.parse(JSON.stringify(obj));

/**
 * 객체에 property 있는지 검사
 * @param {*} obj 검사할 객체
 * @param {*} properties 확인할 property의 배열
 * @returns boolean
 */
export const hasOwnProperties = (obj, properties) =>
  properties.find(property => !Object.prototype.hasOwnProperty.call(obj, property)) === undefined;
/**
 * 값의 합, 숫자로 구한다.
 * @param {*} a
 * @param {*} b
 * @returns 값의 합(nubmer type)
 */
export const add = (a, b) => Number(a) + Number(b);
