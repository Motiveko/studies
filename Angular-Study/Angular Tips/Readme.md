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