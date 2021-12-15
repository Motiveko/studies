# Angular Tips
> Angular Framework에 대해 몰랐던 내용을 정리하는 파일입니다.


## Form
### ControlContainer
- https://jenniferwadella.com/blog/angular-control-container
- `ControlContainer`은 자식 컴포넌트에서 부모 컴포넌트의 `Form Directive`를 참조할 때 사용한다. 자식 컴포넌트에서 생성자 주입 방식으로 `ControlContainer`를 주입하면 부모 요소에 `Form Directive`를 참조하게 된다.
```ts
// Parent Component
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-span-form',
  template: `
  <form [formGroup]="sampleForm">
    <div class="form-group">
      <label for="name">First Name</label>
      <input name="first_name" formControlName="first_name" />
    </div>
    <div class="form-group">
      <label for="name">Last Name</label>
      <input name="last_name" formControlName="last_name" />
    </div>
    <div class="form-group">
      <label for="name">Email Address</label>
      <input name="email" formControlName="email" />
    </div>
    <app-address></app-address>
  </form>
  `,
  styleUrls: ['./span-form.component.less']
})
export class SpanFormComponent implements OnInit {
  public sampleForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.sampleForm = this.fb.group({
      user_name: ['', Validators.required],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      email: ['',Validators.required],
      street: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zip: ['',Validators.required]
    })
  }

}
```
- 위와 같이 부모 컴포넌트에서 `[FormGroup]`가 적용된 템플릿 내에 자식 컴포넌트(app-address)가 있을 때 자식 컴포넌트에서는 아래와 같은 방법으로 부모의 `sampleForm`을 참조할 수 있다.

```ts
// 자식 컴포넌트
import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-address',
  template: `
  <form  *ngIf="ogFormGroup" [formGroup]="ogFormGroup">
    <h5>Address:</h5>
    <div class="form-group">
      <label for="name">Street Name</label>
      <input formControlName="street" />
    </div>
    <div class="form-group">
      <label for="name">City</label>
      <input formControlName="city" />
    </div>
    <div class="form-group">
      <label for="name">State</label>
      <input formControlName="state" />
    </div>
    <div class="form-group">
      <label for="name">Zip</label>
      <input formControlName="zip" />
    </div>
  </form>
  `,
  styleUrls: ['./address.component.less']
})
export class AddressComponent implements OnInit {
  public ogFormGroup;
  constructor(public controlContainer: ControlContainer) {
  }

  ngOnInit() {
    this.ogFormGroup = this.controlContainer.control;
  }
}
```
- `ControlContainer.control`로 부모의 `sampleForm`의 참조를 가져오고 이를 자식의 `ogFormGroup`에 연결했다. 
- `@Optional()` 데코레이터를 붙여 안정성을 높일 수도 있다.
```ts
constructor(
    @Optional() public controlContainer: ControlContainer
) {}
```

<br>

## 각종 ~Ref
> 뭔놈의 `Ref`가 이렇게 많은지 맨날 햇갈린다. 한동안 안쓰면 찾기도 힘들다. 정리해서 사용하자

> 참고1 : [Exploring Angular DOM manipulation techniques using ViewContainerRef](https://indepth.dev/posts/1052/exploring-angular-dom-manipulation-techniques-using-viewcontainerref) <br>
참고2 : [Angular Dynamic Component Loader Example
](https://www.concretepage.com/angular-2/angular-2-4-dynamic-component-loader-example)

<br>

### 1. [ElemetRef](https://angular.io/api/core/ElementRef)
`ElemetRef`는 `View`의 `NativeElement`의 래퍼다. DOM 참조가 가능해진다.
아래와 같이 컴포넌트의 생성자로 DI하면 해당 컴포넌트의 호스트 요소(`NativeElement`의 Wrapper)를 반환한다.
```ts
@Component({
  selector: 'app-test',
})
export class TestComponent {
  constructor(
    private elementRef: ElementRef
  ) {}
  method() {
    const a = elementRef.nativeElement.querySelector('div');
  }
}
```

`템플릿 참조 변수`가 붙은 요소도 참조할 수 있다.

```ts
@Component({
  selector: 'app-test',
  template: `
    <div #d></div>
    <span #s></span>
  `
})
export class TestComponent {
  @ViewChild('s') spanEl: ElementRef;
  @ViewChile('d') divEl: ElementRef;
}
```
`ElemetRef.nativeElement`를 사용하는건 DOM에 직접 접근하는 방식인데(`document.querySelector`처럼), Angular에서는 DOM에 직접 접근하는것을 권장하지 않는다. [Renderer2](https://angular.io/api/core/Renderer2)를 사용하는 접근법을 권장한다. 접근하는 방법은 [이곳](https://www.digitalocean.com/community/tutorials/angular-using-renderer2)을 참고한다. 

사용 예)
```ts
import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appGoWild]'
})
export class GoWildDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'wild');  // 호스트 요소에 wild 클래스 추가

    const div = this.renderer.createElement('div'); // document.createElement('div')와 같다.
    const text = this.renderer.createText('Hello world!');  // 텍스트 요소 생성

    this.renderer.appendChild(div, text); // div에 텍스트 요소 append
    this.renderer.appendChild(this.el.nativeElement, div); // 호스트 요소에 div 요소 append
  }
```

<br>

### 2. [TemplateRef](https://angular.io/api/core/TemplateRef)

`TemplateRef`는 `ng-template`디렉티브로 래핑된 요소를 가리키는 객체를 **생성**한다. 디렉티브에 주입된 `TemplateRef`의 인스턴스는 호스트 요소의 `ng-template` 디렉티브의 참조를 갖는 객체이다.

```ts
@Component({
  selector: 'app-test',
  template: `
    <ng-template #ngt></ng-template>
  `
})
export class TestComponent {
  @ViewChild('ngt') ngt: ViewTemplateRef;
}
```


<br>

### 3. [ViewContainerRef](https://angular.io/api/core/ViewContainerRef)

`ViewContainerRef` 기본적으로 `ng-container`에 대응된다. 여러개의 뷰를 포함할 수 있는 컨테이너다. 
```ts
@Component({
  selector: 'app-test',
  template: `
    <ng-container #ngt></ng-container>
  `
})
export class TestComponent {
  @ViewChild('ngc') ngc: ViewContainerRef;
}
```

`ViewContainerRef`는 View나 컴포넌트를 동적으로 생성할 때 쓴다. 사용을 위해서는 **생성자 주입 방식으로 DI**하고, `createComponent()`로 컴포넌트를 인스턴스화 하여 만든 호스트 뷰나 `createEmbeddedView()`메서드로 `ng-template`을 인스턴스화 하여 만든 임베디드 뷰를 만든다.

여기서는 `createComponent()`로 동적인 컴포넌트 생성을 다뤄본다. 메서드 호출의 결과 타입은인 `ComponentRef`는 컴포넌트에 대한 참조를 지닌다. 

[전체 예제](https://angular.io/guide/dynamic-component-loader)를 참고해서 작성한다.

```ts
// ad.directive.ts
@Directive({
  selector: '[adHost]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
```

```ts
// ad-banner.component.ts
@Component({
  selector: 'app-ad-banner',
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <ng-template adHost></ng-template>
    </div>
  `
})
export class AdBannerComponent implements OnInit, OnDestroy {

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
  
  // ...
  loadComponent() {
    const adItem: AdItem = getItem();

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();   
    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
  }
}
```
```ts
// ad.component.ts
export interface AdComponent {
  data: any;
}
// ad-item.ts
export class AdItem {
  constructor(public component: Type<any>, public data: any) {}
}
```

`AdBannerComponent`의 `loadComponent`에서 `adHost` 디렉티브가 적용된 요소를 가져와, `adHost`디렉티브에 생성자로 주입된 `ViewContainerRef` 객체를 가져온다. 

`viewContainerRef.clear()`로 컨테이너를 비우고 `adItem`에서 컴포넌트를 가져와 `createComponet()`메서드로 컨테이너에 컴포넌트를 생성한다. 결과 타입은 `ComponentRef`로 `location`, `hostView`등을 사용할 수 있게 된다. 

`createComponent()`의 시그니쳐는 아래와 같다.

```ts
export declare abstract class ViewContainerRef {
  // ...
  abstract createComponent<C>(componentType: Type<C>, options?: {
          index?: number;
          injector?: Injector;
          ngModuleRef?: NgModuleRef<unknown>;
          projectableNodes?: Node[][];
      }): ComponentRef<C>;
}
```
`loadComponent()` 호출로 `adHost`의 상태가 바뀌었으니 AngularCD는 변화를 감지해서 다시 랜더링한다.

결과는 아래와 같은 형태다. ng-container는 최종적으로 DOM에 포함되는 요소가 아니고, 주석처리로 흔적만 알 수 있다.

![그림](https://images.velog.io/images/motiveko/post/0774840a-ef7e-4590-ab9a-3f8b10d2dd30/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-15%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.36.03.png))

<br>

### 6. [ComponentRef](https://angular.io/api/core/ComponentRef)
`ViewContainerRef.createComponent`나 `ComponentFactory`에 의해 생성되는 컴포넌트 인스턴스를 가리킨다. 컴포넌트 인스턴스의 `ElementRef`, `Injector` 등에 접근 가능하고, `destroy()` 메서드를 이용해 컴포넌트 제거도 가능하다.


<br>

### 5. [ChangeDetectorRef](https://angular.io/api/core/ChangeDetectorRef)
`ChangeDetectorRef`는 `CD`관련 기능을 제공하는 기본 클래스다. `CD`는 결국 `View`와 관련된 내용이라, `ChangeDetectorRef` 단독으로 쓰이지 않는 것 같고 바로 다음 내용인 `ViewRef`가 `ChangeDetectorRef`를 상속해서 쓴다.

```ts
abstract class ChangeDetectorRef {
  abstract markForCheck(): void
  abstract detach(): void
  abstract detectChanges(): void
  abstract checkNoChanges(): void
  abstract reattach(): void
}
```
1. `markForCheck()` 

`OnPush`전략 사용시, `@Input`등 컴포넌트 상태의 참조가 변해야 View가 `dirty`상태(랜더링 필요)로 변해 CD가 작동하는데, `markForCheck()`를 호출하면 상태변화 없이도 `View`를 chagne 상태로 만들어 명시적으로 뷰에 대한 CD를 다시 시도하게 만든다.

2. `detach()`
`View`를 `Change-Detection-Tree`에서 분리시킨다. 따라서 해당 `View`는 자동으로 `CD`가 적용되지 않고, `detectChanges()` 메서드로만 `CD` 할 수 있다.

3. `detectChanges()`
해당 `View`와 자식요소에 대한 `CD`를 실행한다.(이렇게 수동으로 하는걸 local change detection check라고 한단다.)

4. `checkNoChanges()`
`View`와 자식요소에 대해 `CD`를 수행하고, 변화가 있으면 에러를 던진다.

5. `reattach()`
`detach()`의 반대로 `View`를 `Change-Detection-Tree`에 합친다. 자동 CD가 가능할것이다.

<br>


### [ViewRef](https://angular.io/api/core/ViewRef)
`ViewRef`는 `ChangeDetectorRef`를 상속하는 객체로, Angular View의 추상화된 객체다. `ChangeDetectorRef`의 속성 외에 `onDestroy`, `destroy`, `destroyed` 속성이 있다. 이름 그대로 동작한다. 따라서 생략.

<br>

### [EmbeddedViewRef](https://angular.io/api/core/EmbeddedViewRef)
`EmbeddedViewRef`는 `ViewRef`를 상속한다. 역시나 Angular View에 대한 참조를 가지는 객체인데, `Component`나 `ViewContainerRef.createEmbeddedView()`의 결과로 참조된다.(제너릭 타입이 존재한다.) 추가적인 속성으로 `context`와 `rootNodes`속성을 가진다.

```ts
abstract class EmbeddedViewRef<C> extends ViewRef {
  abstract context: C
  abstract rootNodes: any[]

  //... ViewRef, ChangeDetectorRef의 속성들
```

### ApplicationRef
### NgModuleRef
### PlatformRef
