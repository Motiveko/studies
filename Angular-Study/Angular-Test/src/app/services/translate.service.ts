import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Translations {
  [key: string]: string;
}

@Injectable()
export class TranslateService {
  private currentLang = 'en';

  private translations: Translations | null = null;

  public onTranslationChange = new EventEmitter<Translations>();

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang);
  }

  public use(language: string): void {
    this.currentLang = language;
    this.loadTranslations(language);
  }

  /** Sync/Async로 처리된다.*/
  public get(key: string): Observable<string> {
    if (this.translations) {
      return of(this.translations[key]);
    }
    return this.onTranslationChange.pipe(
      take(1),
      map((translations) => translations[key])
    );
  }

  /** 설정된 language값에 따라 translation 가져온다. */
  private loadTranslations(language: string): void {
    this.translations = null;
    this.http
      .get<Translations>(`assets/${language}.json`)
      .subscribe((translations) => {
        this.translations = translations;
        this.onTranslationChange.emit(translations);
      });
  }
}
