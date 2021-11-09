import { invalid } from '@angular/compiler/src/render3/view/util';
import { Directive, HostBinding, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { findFormControl } from 'src/app/utils/findFormControl';

// 에러 메시지를 화면에 랜더링 하는 요소와 별개로 Aria attribute로 추가하기 위함(스크린 리더라는 html 읽어주는 시각장애인용 도구에서 읽는 값이라고함)
@Directive({
  selector: '[appErrorMessage]',
})
export class ErrorMessageDirective implements OnInit {
  @HostBinding('attr.aria-invalid')
  get ariaInvalid(): true | null {
    return this.isActive() ? true : null;
  }
  @HostBinding('attr.aria-errormessage')
  get ariaErrormessage(): string | null {
    return this.isActive() && this.appErrorMessage
      ? this.appErrorMessage
      : null;
  }
  @Input()
  public appErrorMessage?: string;

  @Input()
  public formControl?: AbstractControl;

  @Input()
  public formControlName?: string;

  private control?: AbstractControl;

  constructor(@Optional() private controlContainer?: ControlContainer) {}

  public ngOnInit(): void {
    this.control = findFormControl(
      this.formControl,
      this.formControlName,
      this.controlContainer
    );
  }

  private isActive(): boolean {
    const { control } = this;
    return (
      control !== undefined &&
      control.invalid &&
      (control.touched || control.dirty)
    );
  }
}
