interface Tuple extends Array<number | string> {
  0: string;
  1: number;
  length: 2;
}
const t: Tuple = ["1", 2];
t.forEach((val) => console.log(val));
