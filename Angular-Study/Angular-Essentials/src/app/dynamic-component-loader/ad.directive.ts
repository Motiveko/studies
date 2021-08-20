import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]',
})
export class AdDirective {
  /**
   *  ViewContainerRef를 주입, 추후 createComponent()메소드로 이 디렉티브가 적용된 elemnt에 동적으로 component를 DOM에 load하게 한다.
   */
  constructor(public viewContainerRef: ViewContainerRef) {}
}
