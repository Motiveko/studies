interface Scatter {
  a: string,
  b: number,
  c: boolean
}
type MappedScatter = {[key in keyof Scatter ]: boolean};
const m: MappedScatter = {
  a: true,
  b: false,
  c: true
}