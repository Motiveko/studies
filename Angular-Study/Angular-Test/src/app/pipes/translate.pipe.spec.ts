import { Component, EventEmitter } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TranslateService, Translations } from '../services/translate.service';
import { expectContent, expectText } from '../spec-helpers/element.spec-helper';
import { TranslatePipe } from './translate.pipe';

const key1 = 'key1';
const key2 = 'key2';

@Component({
  template: `{{ key | translate }}`,
})
class HostComponent {
  public key = key1;
}

describe('TranslatePipe', () => {
  let fixture: ComponentFixture<HostComponent>;
  let translateService: Pick<TranslateService, 'onTranslationChange' | 'get'>;

  beforeEach(async () => {
    translateService = {
      onTranslationChange: new EventEmitter<Translations>(),
      get(key: string): Observable<string> {
        return of(`Translation for ${key}`);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [TranslatePipe, HostComponent],
      providers: [{ provide: TranslateService, useValue: translateService }],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(HostComponent);
  });

  // service가 동기방식으로 값을 줄때 테스트
  it('translates the key, sync service response', () => {
    fixture.detectChanges();
    expectContent(fixture, 'Translation for key1');
  });

  // translateService가 비동기로 동작할때의 테스트는 delay oerator로 가라로 만들고, fakeAsync 함수로 테스트한다.
  it('translates the key, async service response', fakeAsync(() => {
    translateService.get = (key) =>
      of(`Async translation for ${key}`).pipe(delay(100));
    fixture.detectChanges();
    expectContent(fixture, '');

    tick(100);

    fixture.detectChanges();
    expectContent(fixture, 'Async translation for key1');
  }));

  it('translates a changed key', () => {
    fixture.detectChanges();
    fixture.componentInstance.key = key2;
    fixture.detectChanges();

    expectContent(fixture, 'Translation for key2');
  });

  it('updates on translation change', fakeAsync(() => {
    fixture.detectChanges();
    translateService.get = (key) => of(`New translation for ${key}`);
    // translation이 바뀌면 값을 emit, pipe에서 이걸 구독하고 있다가 translateService.get()을 다시 호출한다.
    translateService.onTranslationChange.emit({});
    fixture.detectChanges();
    expectContent(fixture, 'New translation for key1');
  }));
});
