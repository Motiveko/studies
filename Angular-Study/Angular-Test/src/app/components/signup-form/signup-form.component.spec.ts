import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SignupService } from 'src/app/services/signup/signup.service';
import { ControlErrorsComponent } from './control-errors/control-errors.component';
import { ErrorMessageDirective } from './directives/error-message.directive';

import { SignupFormComponent } from './signup-form.component';
import { PasswordStrength } from '../../services/signup/signup.service';
import {
  checkField,
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
import { NO_ERRORS_SCHEMA } from '@angular/core';

const strongPassword: PasswordStrength = {
  score: 4,
  warning: 'too short',
  suggestion: ['try a longer password'],
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

  it('submits the form successfully', fakeAsync(async () => {
    await setup();
    fillForm();
    fixture.detectChanges();

    // 1초간 기다리는것을 simulation한다.
    tick(1233);

    // find form and emit submit event
    findEl(fixture, 'form').triggerEventHandler('submit', {});

    expect(signupService.signup).toHaveBeenCalledWith(signupData);
  }));
});
