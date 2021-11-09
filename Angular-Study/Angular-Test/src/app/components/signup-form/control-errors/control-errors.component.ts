import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ValidationErrors,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { findFormControl } from 'src/app/utils/findFormControl';

interface TemplateContext {
  $implicit: ValidationErrors;
}

@Component({
  selector: 'app-control-errors',
  templateUrl: './control-errors.component.html',
  styleUrls: ['./control-errors.component.css'],
})
export class ControlErrorsComponent implements OnInit, OnDestroy {
  @Input()
  public control?: AbstractControl;

  @Input()
  public controlName?: string;

  private unsubscriber = new Subject();

  public internalControl?: AbstractControl;

  @ContentChild(TemplateRef)
  public template: TemplateRef<TemplateContext> | null = null;

  public templateContext: TemplateContext = {
    $implicit: {},
  };

  constructor(
    @Optional()
    private controlContainer?: ControlContainer
  ) {}

  ngOnInit(): void {
    this.internalControl = findFormControl(
      this.control,
      this.controlName,
      this.controlContainer
    );

    this.internalControl.statusChanges
      .pipe(startWith('PENDING'))
      .subscribe(() => {
        this.updateTemplateContext();
      });
  }

  // https://angular.io/api/common/NgTemplateOutlet
  // ngTemplateOutletContext에서 key가 $implicit인것은 기본값으로 사용 가능하다.
  // 즉 부무의 ng-template에서 let-errors directive를 하면 errors = this.internalControl.errors가 되는 것.
  private updateTemplateContext(): void {
    if (this.internalControl && this.internalControl.errors) {
      this.templateContext = {
        $implicit: this.internalControl.errors,
      };
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber.next(';');
  }
}
