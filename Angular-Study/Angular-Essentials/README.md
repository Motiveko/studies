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
- 디렉티브의 constructor parameter로 TemplateRef 객체와 ViewContainerRef객체를 DI하는데, 각각 아래와 같은 객체이다.
    - TemplateRef : ng-template 디렉티브의 참조를 갖는 객체
    - 새로운 요소(Component, ng-template으로 랩핑된 요소)를 DOM에 삽입하기 위한 컨테이너(DOM)
- 코드와 같이 @Input()의 setter방식으로 condition값의 변경(onChanges)에 따라 ViewContainerRef의 createEmbeddedView(TemplateRef) 메소드로 ng-template 을 DOM에 추가/삭제하는 로직을 수행시킨다.

<br>

---

## [Dynamic component loader](https://github.com/Motiveko/studies/tree/master/Angular-Study/Angular-Essentials/src/app/dynamic-component-loader)
> ViewContainerRef, ComponentFactory를 이용해 런타임에서 동적으로 컴포넌트를 DOM에 추가/제거할 수 있다.

- [앵귤러 공식문서 가이드](https://angular.io/guide/dynamic-component-loader)

- 호스트 컴포넌트(AdBannerComponent)에 동적으로 컴포넌트를 랜더링할 위치에 ng-template을 선언하고 커스텀 디렉티브(adHost)를 추가한다. adHost디렉티브는 생성자로 ViewContainerRef를 주입받는다.

```typescript
// 랜더링할 컴포넌트, 컴포넌트에 주입할 데이터의 인터페이스 클래스
export class AdItem {
    constructor(public component: Type<any>, public data: any) {}
}
```

```typescript
@Directive({
  selector: '[adHost]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
```
- 호스트 컴포넌트는 ComponentFactoryResolver를 생성자로 주입받는다. 이 클래스는 ComponentFactory를 생성하고, ViewContainerRef의 createComponent() 메소드의 파라미터로 사용되어, DOM에 컴포넌트를 추가할 수 있다.
- ViewContainerRef.createComponent(ComponentFactory) 의 결과로 ComponentRef를 얻을 수 있고 이는 DOM에 추가된 컴포넌트에 대한 참조를 지닌다. .으로 내부 프로퍼티를 참조/조작 할 수 있다.

```typescript
export class AdBannerComponent implements OnInit, OnDestroy{
  
  // 서비스 등으로 랜더링할 컴포넌트를 주입받는다.
  @Input('ads') ads: AdItem[] = [];
  currentAdIndex = -1;
  // 선언된 디렉티브를 참조, 디렉티브의 ViewContainerRef를 사용한다.
  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  interval: number | undefined;

  // 생성자로 ComponentFactoryResolver를 받는다.
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  // 3초마다 랜더링할 컴포넌트 변경
  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }

  loadComponent() {
    
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem: AdItem = this.ads[this.currentAdIndex];

    // Component Factory를 받는다.
    const componentFactory: ComponentFactory<AdComponent> = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear()

    // Directive의 vieContainerRef.createComponent()로 DOM에 AdComponent Component 추가
    const componentRef = viewContainerRef.createComponent(componentFactory);

    // componentRef로 컴포넌트 내부 프로퍼티를 조작할 수 있다.
    componentRef.instance.data = adItem.data;
  
  }

}

```

- 이 방법으로 동적 컴포넌트를 랜더링 할 때 치명적인 문제가 있는데, 컴파일이 완료된 런타임에 컴포넌트가 DOM에 추가되기 때문에 <strong>뷰의 캡슐화가 이뤄지지 않는다.</strong>는 것이다. 결국 컴포넌트의 스타일을 변경하려면
  - 인라인으로 스타일 지정
  - ViewEncapsulation.None으로 스타일 캡슐화를 사용하지 않음
  - index.html에 css를 직접 넣는다

 - 의 방법이 존재하나 이는 바람직한 방법인가 생각해봐야한다.

