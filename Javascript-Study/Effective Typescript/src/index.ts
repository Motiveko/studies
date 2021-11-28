interface Person {
  name: String;
}
interface Lifespan {
  birth: number;
  date: number;
}

type PersonSpan = Person & Lifespan;
interface PersonSpanI {
  name: String;
  birth: number;
  date: number;
}
function test(x: PersonSpan) {}
const x = {
  name: "",
  birth: 1,
  date: 3,
  kill: true,
};

test(x);
