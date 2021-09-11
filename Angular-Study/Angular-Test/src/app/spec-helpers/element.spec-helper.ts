import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function findEl<T>(
  fixture: ComponentFixture<T>,
  testid: string
): DebugElement {
  return fixture.debugElement.query(By.css(`[data-testid="${testid}"]`));
}

export function click<T>(fixture: ComponentFixture<T>, testid: string): void {
  const element = findEl(fixture, testid);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
}

export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
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
  };
}

export function expectText<T>(
  fixture: ComponentFixture<T>,
  testid: string,
  text: string
): void {
  const element = findEl(fixture, testid);
  const actualText = element.nativeElement.textContent;
  expect(actualText).toBe(text);
}

export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  testid: string,
  value: string
): void {
  setFieldElementValue(findEl(fixture, testid).nativeElement, value);
}

/**
 * Form Field(Input, TextArea, Select)에 value를 채운다.
 * 그 후 Angular 가 value change를 detect할 수 있게 적절한 event를 dispatch한다.
 * 'input' => Input, TextArea, 'select' => 'select'
 * 
 * @param element form field
 * @param value form field value
 */
export function setFieldElementValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string
): void {
    element.value = value;

    const isSelect = element instanceof HTMLSelectElement;
    dispatchFakeEvent(element, isSelect ? 'select' : 'input', isSelect ? false : true);
}

/**
 * element에 fake event(synthetic event)를 dispatch함

 * @param element Element that is the target of the event
 * @param type Event name e.g. `input`
 * @param bubbles Whether the event bubbles up in the DOM tree
 */
export function dispatchFakeEvent(
    element: EventTarget,
    type: string,
    bubbles: boolean = false
): void {
    const event = document.createEvent('Event');
    event.initEvent(type, bubbles, false);
    element.dispatchEvent(event);
}

/**
 * fixture에서 selector로 원하는 Component를 찾는다.
 * @param fixture 
 * @param selector 
 * @returns 
 */
export function findComponent<T> (
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}