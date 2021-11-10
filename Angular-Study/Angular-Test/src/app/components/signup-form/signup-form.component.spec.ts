import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { SignupService } from 'src/app/services/signup/signup.service';
import { ControlErrorsComponent } from './control-errors/control-errors.component';
import { ErrorMessageDirective } from './directives/error-message.directive';

import { SignupFormComponent } from './signup-form.component';
import { PasswordStrength } from '../../services/signup/signup.service';
import {
  checkField,
  click,
  dispatchFakeEvent,
  expectText,
  findEl,
  setFieldValue,
} from 'src/app/spec-helpers/element.spec-helper';
import {
  addressLine1,
  addressLine2,
  city,
  country,
  email,
  name,
  password,
  postcode,
  region,
  signupData,
  username,
} from 'src/app/spec-helpers/signup-data.spec-helper';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { find } from 'rxjs/operators';

// required validator가 붙은 formControl의 testId
const requiredFields = [
  'username',
  'email',
  'name',
  'addressLine2',
  'city',
  'postcode',
  'tos',
];

const weakPassword: PasswordStrength = {
  score: 2,
  warning: 'too short',
  suggestions: ['try a longer password'],
};

const strongPassword: PasswordStrength = {
  score: 4,
  warning: '',
  suggestions: [],
};

describe('SignupFormComponent', () => {
  let fixture: ComponentFixture<SignupFormComponent>;

  let signupService: jasmine.SpyObj<SignupService>;

  /*
    Test 환경 setup 메서드, 매 spec마다 실행한다.
    befroeEach()로 실행하지 않는 이유는 SignupService의 동작을 동적으로 설정하기 위함.
  */
  const setup = async (
    signupServiceReturnValues?: jasmine.SpyObjMethodNames<SignupService>
  ) => {
    // Spy SignupService 셋팅, 기본값은 모두 success되는것으로 설정되어있다.
    signupService = jasmine.createSpyObj<SignupService>('SignupService', {
      isUsernameTaken: of(false),
      isEmailTaken: of(false),
      getPasswordStrength: of(strongPassword),
      signup: of({ success: true }),
      // 여기 포함된 메서드(프로퍼티)는 override되므로 spy service의 반환값을 dynamic하게 설정 가능하다.
      ...signupServiceReturnValues,
    });
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        SignupFormComponent,
        ControlErrorsComponent,
        ErrorMessageDirective,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SignupService,
          useValue: signupService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);

    fixture.detectChanges();
  };

  // form을 valid data로 채운다.
  const fillForm = () => {
    setFieldValue(fixture, 'username', username);
    setFieldValue(fixture, 'email', email);
    setFieldValue(fixture, 'password', password);
    setFieldValue(fixture, 'name', name);
    setFieldValue(fixture, 'addressLine1', addressLine1);
    setFieldValue(fixture, 'addressLine2', addressLine2);
    setFieldValue(fixture, 'city', city);
    setFieldValue(fixture, 'postcode', postcode);
    setFieldValue(fixture, 'region', region);
    setFieldValue(fixture, 'country', country);
    checkField(fixture, 'tos', true);
  };

  // input에서 blur 이벤트 발생시 touched로 변한다.
  const markFieldAsTouched = (element: DebugElement) => {
    dispatchFakeEvent(element.nativeElement, 'blur');
  };

  // ==== Successful form submission ====
  // fakeAsync로 함수를 감싸면 함수는 fakeAsync zone에서 실행. timer들은 모두 synchronous하게 변하고 tick()으로 시간 경과를 simulate 할수있다.
  it('submits the form successfully', fakeAsync(async () => {
    await setup();
    fillForm();
    fixture.detectChanges();

    // async validator가 username/email/pw 를 검사하기 전까지는 form이 invalid므로 submit 버튼은 disabled
    const submitButton = findEl(fixture, 'submit');
    expect(submitButton.properties.disabled).toBe(true);

    // 1초간 기다리는것을 simulation한다.
    tick(1233);
    fixture.detectChanges();

    expect(submitButton.properties.disabled).toBe(false);

    // find form and emit submit event
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();

    // signup 성공시 성공 메시지 화면에 출력
    expectText(fixture, 'status', 'Sign-up successful!');

    expect(signupService.isUsernameTaken).toHaveBeenCalledWith(username);
    expect(signupService.isEmailTaken).toHaveBeenCalledWith(email);
    expect(signupService.getPasswordStrength).toHaveBeenCalledWith(password);
    expect(signupService.signup).toHaveBeenCalledWith(signupData);
  }));

  // ==== Invalid form ====
  it('does not submit an invalid form', fakeAsync(async () => {
    await setup();

    tick(1000);

    findEl(fixture, 'form').triggerEventHandler('submit', {});

    // 폼에 값의 변화가 없으므로 async validator의 validate가 호출되지 않았다.
    expect(signupService.isUsernameTaken).not.toHaveBeenCalled();
    expect(signupService.isEmailTaken).not.toHaveBeenCalled();
    expect(signupService.getPasswordStrength).not.toHaveBeenCalled();
    expect(signupService.signup).not.toHaveBeenCalled();
  }));

  // ==== Form submission failure ====
  it('handles signup failure', fakeAsync(async () => {
    await setup({
      // throwError
      signup: throwError(new Error('Validation failed')),
    });
    fillForm();

    tick(1000);

    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();

    expectText(fixture, 'status', 'Sign-up error');

    expect(signupService.isUsernameTaken).toHaveBeenCalled();
    expect(signupService.isEmailTaken).toHaveBeenCalled();
    expect(signupService.getPasswordStrength).toHaveBeenCalled();
  }));

  // ==== Required fields ====
  it('marks fields as required', fakeAsync(async () => {
    await setup();

    // Mark required fields as touched
    requiredFields.forEach((testId) => {
      markFieldAsTouched(findEl(fixture, testId));
    });
    fixture.detectChanges();

    requiredFields.forEach((testId) => {
      const el = findEl(fixture, testId);
      // required인 요소에는 aira-requried attr이 true다.
      expect(el.attributes['aria-required'])
        .withContext(`${testId} must be marked as aria-required`) // expect 실패시 에러 메시지에 출력될 내용
        .toBe('true');

      // aria-invalid
      expect(el.attributes['aria-invalid'])
        .withContext(
          `${testId} 요소의 aria-invalid 어트리뷰트 값은 true여야 합니다.`
        )
        .toBe('true');
      // required 요소가 invalid이면 aria-errormessage 어트리뷰트에 error id값이 생기고,
      // 그 값을 id로 가지는 app-control-errors 요소가 error message를 랜더링 한다
      const errormessageId = el.attributes['aria-errormessage'];
      if (!errormessageId) {
        throw new Error(`Error message id for ${testId} not present`);
      }
      const errormessageEl = document.getElementById(errormessageId);
      if (!errormessageEl) {
        throw new Error(`Error message element for ${testId} not found`);
      }
      // // Terms and Service만 에러메시지가 다르다
      if (errormessageId === 'tos-errors') {
        expect(errormessageEl.textContent).toContain(
          'Please accept the Terms and Services'
        );
      } else {
        expect(errormessageEl.textContent).toContain('must be given');
      }
    });
  }));

  // ==== Asynchronous validators ====

  it('fails if the username is takne', fakeAsync(async () => {
    await setup({
      isUsernameTaken: of(true),
    });

    fillForm();
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties.disabled).toBe(true);

    findEl(fixture, 'form').triggerEventHandler('submit', {});

    const errormessageId = findEl(fixture, 'username').attributes[
      'aria-errormessage'
    ];
    if (!errormessageId) {
      throw new Error(`Error message id for username not present`);
    }

    const errormessageEl = document.getElementById(errormessageId);
    if (!errormessageEl) {
      throw new Error(`Error message element for username not found`);
    }

    expect(errormessageEl.textContent).toContain(
      'User name is already taken. Please choose another one.'
    );
    expect(signupService.isUsernameTaken).toHaveBeenCalledWith(username);
    expect(signupService.isEmailTaken).toHaveBeenCalledWith(email);
    expect(signupService.getPasswordStrength).toHaveBeenCalledWith(password);
    expect(signupService.signup).not.toHaveBeenCalled();
  }));

  // email taken 테스트는 username takne과 거의 비슷하므로 조금 생략해본다.
  it('fails if the email is taken', fakeAsync(async () => {
    await setup({
      isEmailTaken: of(true),
    });

    fillForm();
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties.disabled).toBe(true);

    findEl(fixture, 'submit').triggerEventHandler('submit', {});

    expect(signupService.isEmailTaken).toHaveBeenCalledWith(email);
    expect(signupService.signup).not.toHaveBeenCalled();
  }));

  it('fails if the password is too weak', fakeAsync(async () => {
    await setup({
      getPasswordStrength: of(weakPassword),
    });

    fillForm();
    tick(1000);
    fixture.detectChanges();
    const submitBtn = findEl(fixture, 'submit');
    expect(submitBtn.properties.disabled).toBe(true);

    submitBtn.triggerEventHandler('submit', {});

    expect(signupService.signup).not.toHaveBeenCalled();

    const errormessageId = findEl(fixture, 'password').attributes[
      'aria-errormessage'
    ];
    if (!errormessageId) {
      throw new Error('password의 errormessageId가 없습니다.');
    }
    const errormessageEl = document.getElementById(errormessageId);
    if (!errormessageEl) {
      throw new Error('password의 에러메시지 Element가 존재하지 않습니다.');
    }

    expect(errormessageEl.textContent).toContain('❗  Password is too weak. ');
  }));

  // ==== Dynamic field relations ====
  it('requires address line 1 for business and non-profit plans', async () => {
    await setup();

    const addressLine1El = findEl(fixture, 'addressLine1');

    // 기본 : plan = PERSONAL
    // form field가 invalid면 angular에서 자동으로 설정하는 값
    expect('ng-invalid' in addressLine1El.classes).toBe(false);
    expect('aria-required' in addressLine1El.attributes).toBe(false);

    // plan = BUSINESS
    checkField(fixture, 'plan-business', true);
    fixture.detectChanges();

    expect('ng-invalid' in addressLine1El.classes).toBe(true);
    expect('aria-required' in addressLine1El.attributes).toBe(true);

    // plan = NON-PROFIT
    checkField(fixture, 'plan-non-profit', true);
    fixture.detectChanges();

    expect('ng-invalid' in addressLine1El.classes).toBe(true);
    expect('aria-required' in addressLine1El.attributes).toBe(true);
  });

  // ==== Password type toggle ====
  it('toggles the password display', async () => {
    await setup();

    const passwordEl = findEl(fixture, 'password');
    expect(passwordEl.attributes['type']).toBe('password');

    click(fixture, 'show-password');
    fixture.detectChanges();

    expect(passwordEl.attributes['type']).toBe('text');

    click(fixture, 'show-password');
    fixture.detectChanges();

    expect(passwordEl.attributes.type).toBe('password');
  });

  // ==== Testing form accessibility ====
});
