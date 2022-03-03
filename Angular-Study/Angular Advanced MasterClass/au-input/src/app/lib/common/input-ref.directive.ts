import { Directive, HostListener } from '@angular/core';

@Directive({
  // au-fa-input 의 자식 요소중 input에 대해서 적용된다!
  selector: 'au-fa-input input'
})
export class InputRefDirective {
  focus = false; // focus 여부

  @HostListener('focus')
  onFocus() {
    this.focus = true;
  }

  @HostListener('blur')
  onBlur() {
    this.focus = false;
  }
}
