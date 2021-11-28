interface Person {
  first: string;
}
const p: Person = {
  first: "r",
};
const first: typeof p["first"] = "1";
