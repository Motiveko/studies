import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function click<T>(
  fixture: ComponentFixture<T>,
  testid: string
): void {
  const element = fixture.debugElement.query(By.css(`[data-testid=${testid}]`));
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
}

export function makeClickEvent(
  target: EventTarget
): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0,
  }
}