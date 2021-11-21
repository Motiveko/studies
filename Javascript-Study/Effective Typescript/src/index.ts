function addKeyListener(
  el: HTMLElement,
  // fn: (this: HTMLElement, e: KeyboardEvent) => void
  fn: (val: HTMLElement, e: KeyboardEvent) => void
) {
  el.addEventListener("keydown", (e) => {
    fn(el, e);
  });
}
