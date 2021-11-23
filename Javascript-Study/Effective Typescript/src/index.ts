const days = ["월", "화", "수", "목", "금", "토", "일"] as const;

type FirstEntity<T extends readonly unknown[]> = T[0];
type Length<T extends readonly unknown[]> = T["length"];

type Day<T extends readonly unknown[]> = T[number];

// Parameters
type Parameterz<T> = T extends (...args: infer U) => any ? U : never;

type DropFirst<Tuple extends readonly unknown[]> = ((
  ...tail: Tuple
) => any) extends (head: unknown, ...tail: infer Tail) => any
  ? Tail
  : never;

type Last<Tuple extends readonly unknown[]> = Tuple[DropFirst<Tuple>["length"]];
// type Last<Tuple extends readonly unknown[]> = Tuple[DropFirst<Tuple>["length"]];

const last: Last<typeof days> = "일";
// const p: FirstEntity<typeof days> = '월';

function assertType<T>(val: T) {}
// Item 52
const double = (x: number) => 2 * x;
let p: Parameterz<typeof double> = null!; //

let r: ReturnType<typeof double> = null!;
assertType<number>(r);

declare function map<U, V>(
  array: U[],
  fn: (this: U[], u: U, i: number, array: U[]) => V
): V;

const beat = [";"];
assertType<number>(
  map(beat, function (name, i, array) {
    assertType<string>(name);
    assertType<number>(i);
    this;
    return name.length;
  })
);

document.querySelector("#123")?.attachShadow({ mode: "open" });
document.querySelector("#123")!.innerHTML = "<p></p>";
class X extends HTMLElement {}
customElements.define("custom-input", X);

const obj = {
  one: "1",
  two: "2",
};
let key: keyof typeof obj;
for (key in obj) {
  console.log(obj[key]);
}

function addDragHandler(el: HTMLElement) {
  el.addEventListener("mousedown", (eDown) => {
    const dragStart = [eDown.clientX, eDown.clientY];
    const handleUp = (eUp: MouseEvent) => {
      el.classList.remove("dragging");
      el.removeEventListener("mouseup", handleUp);
      const dragEnd = [eUp.clientX, eUp.clientY];
    };
  });
}
const div = document.getElementById("surface");
if (div) {
  addDragHandler(div);
}
