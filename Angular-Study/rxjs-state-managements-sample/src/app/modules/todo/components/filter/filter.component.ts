import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Filter } from '../../models/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input()
  set filter(filter: Filter) {
    // {emitEvent: false}는 setValue가 formGroup의 valueChanges() 에 이벤트를 방출하지 않게함
    // 이미 filtered한 state를 가지고 모든동작이 이뤄지므로 쓸데없이 중복호출하는걸 막는다?? 로 이해하면될까?
    this.formGroup.setValue(filter, { emitEvent: false });
  }
  @Output() filterUpdate: EventEmitter<Filter> = new EventEmitter();

  formGroup: FormGroup = new FormGroup({
    search: new FormControl(),
    category: new FormGroup({
      isPrivate: new FormControl(),
      isBusiness: new FormControl(),
    }),
  });

  private unSubscribe$ = new Subject();

  constructor() {}

  // TODO : getter 안쓰고도 가능한데, 나는 오류가 자꾸뜬다. tsconfig를 찾아보자
  get search(): FormControl {
    return this.formGroup.get('search') as FormControl;
  }
  get category(): FormControl {
    return this.formGroup.get('category') as FormControl;
  }

  ngOnInit(): void {
    // search, category를 나누는 이유는 category의 valueChanges가 formGroup의 valueChanges로 이어지지 않기 때문인듯
    this.search.valueChanges
      .pipe(takeUntil(this.unSubscribe$), debounceTime(350))
      .subscribe((value) => {
        this.filterUpdate.emit({
          ...this.formGroup.value,
          search: value,
        });
      });

    this.search.valueChanges
      .pipe(takeUntil(this.unSubscribe$), debounceTime(300))
      .subscribe((value) => {
        this.filterUpdate.emit({
          ...this.formGroup.value,
          category: value,
        });
      });
  }

  ngOnDestroy(): void {
    // 이걸로 정리해줘야 할 subscription이 한방에 정리되게 한다.
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
