# Angular Essentials
> 서적 Angular Essentials과 Angular 공식가이드 등에서 유익하다 생각되는 내용을 간단한 모듈로 구현하고 정리해놓는 프로젝트.

<br>



```
ng serve
```

---

<br>

## [사용자 정의 Custom Structural Directive](https://github.com/Motiveko/studies/tree/master/Angular-Study/Angular-Essentials/src/app/directives) 
> *ngIf 디렉티브가 작동하는 원리와, 이와 유사한 myNgIf 디렉티브를 구현해본다.

```typescript
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
```

- @Directive 데코레이터의 selector 프로퍼티의 값(myNgIf) 앞에 *를 붙여 적용하고자 하는 element의 attribute로 적용하고 적할 값을 넘겨준다.

```
<elemnt *myNgIf="true | false">
```
- 이렇게 넘겨준 값은 @Input() 디렉티브로 받을 수있다.
- 디렉티브의 constructor parameter로 TemplateRef 객체와 ViewContainerRef객체를 받는데 각각 아래와 같은 객체이다.
    - TemplateRef : ng-template 디렉티브의 참조를 갖는 객체
    - 새로운 요소(Component, ng-template으로 랩핑된 요소)를 DOM에 삽입하기 위한 컨테이너(DOM)
- 코드와 같이 @Input()의 setter방식으로 condition값의 변경(onChanges)에 따라 ViewContainerRef의 createEmbeddedView(TemplateRef) 메소드로 ng-template 을 DOM에 추가/삭제하는 로직을 수행시킨다.
