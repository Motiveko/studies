interface Test {
  a: string;
  b: string;
  c: number;
}
const ab: Pick<Test, "a" | "b"> = {
  a: "undefined",
  b: "asdf",
};
