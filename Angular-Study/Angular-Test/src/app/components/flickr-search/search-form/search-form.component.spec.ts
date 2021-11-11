import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  click,
  findEl,
  setFieldValue,
} from 'src/app/spec-helpers/element.spec-helper';
import { searchTerm } from 'src/app/spec-helpers/photo.spec-helper';

import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts a search', () => {
    let actualSearchTerm: string | undefined;
    fixture.componentInstance.search.subscribe((searchEmitted) => {
      actualSearchTerm = searchEmitted;
    });

    const preventDefault = jasmine.createSpy('submit preventDefault');

    setFieldValue(fixture, 'search-term-input', searchTerm);
    findEl(fixture, 'form').triggerEventHandler('submit', {
      preventDefault,
    });

    expect(actualSearchTerm).toBe(searchTerm);
    expect(preventDefault).toHaveBeenCalled();
  });
});
