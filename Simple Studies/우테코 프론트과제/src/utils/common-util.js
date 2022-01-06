export const cloneDeep = obj => JSON.parse(JSON.stringify(obj));
export const hasOwnProperties = (obj, properties) =>
  properties.find(property => !Object.prototype.hasOwnProperty.call(obj, property)) === undefined;
