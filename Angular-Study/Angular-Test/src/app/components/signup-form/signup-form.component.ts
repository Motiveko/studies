import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SignupService } from 'src/app/services/signup/signup.service';

const { email, maxLength, pattern, required, requiredTrue } = Validators;
const ASYNC_VALIDATION_DELAY = 1000;

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {


  constructor(
    private signupService: SignupService,
    private formBuilder: FormBuilder
  ) { }

  public form = this.formBuilder.group({
    plan: ['personal', required],
    username: [
      null,
      [required, pattern('[a-zA-Z0-9.]+'), maxLength(50)],
      (control: AbstractControl) => this.validateUsername(control.value)
    ],
    email: [
      null,
      [required, email, maxLength(100)],
      (control: AbstractControl) => this.validateEmail(control.value)
    ],
    password: [ null, required, () => this.validatePassword()],
    tos: [null, requiredTrue],
    address: this.formBuilder.group({
      name:[null, required],
      addressLine1: [null],
      addressLine2: [null, required],
      city: [null, required],
      postcode: [null, required],
      region: [null],
      country: [null, required]
    })

  })


  validateUsername(username: any): Observable<ValidationErrors> {
    return timer(ASYNC_VALIDATION_DELAY).pipe(
      switchMap(() => this.signupService.isUsernameTaken(username)),
      map((usernameTaken) => (usernameTaken) ? { taken: true } : {})
    );
  }

  validateEmail(email: string): Observable<ValidationErrors> {
    return timer(ASYNC_VALIDATION_DELAY).pipe(
      switchMap(() => this.signupService.isEmailTaken(email)),
      map((emailTaken) => emailTaken ? { taken: true } : {})
    );
  }

  validatePassword(): Observable<ValidationErrors> {
    // TODO : 다시한번 살펴보고 해보자
    throw new Error('Method not implemented.');
  }

}