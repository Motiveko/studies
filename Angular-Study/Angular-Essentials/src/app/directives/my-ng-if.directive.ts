import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myNgIf]',
})
export class MyNgIfDirective {
  constructor(
    // ng-template 디렉티브의 참조를 갖는 객체
    private templateRef: TemplateRef<any>,
    // 새로운 요소(Component, ng-template으로 랩핑된 요소)를 DOM에 삽입하기 위한 컨테이너(DOM)
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set myNgIf(condition: boolean) {
    if(condition) {
      // 호스트 뷰에 ng-template 디렉티브를 추가
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // 호스트 뷰에 ng-template 디렉티브를 제거
      this.viewContainer.clear();
    }
  }
}
