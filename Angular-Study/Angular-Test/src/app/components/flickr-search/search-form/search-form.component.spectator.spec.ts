import { ComponentFixture, TestBed } from '@angular/core/testing';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { searchTerm } from 'src/app/spec-helpers/photo.spec-helper';

import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let spectator: Spectator<SearchFormComponent>;

  const createComponent = createComponentFactory({
    component: SearchFormComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('satrts a search', () => {
    let actualSearchTerm: string | undefined;
    spectator.component.search.subscribe((searchEmitted) => {
      actualSearchTerm = searchEmitted;
    });

    spectator.typeInElement(searchTerm, byTestId('search-term-input'));

    spectator.dispatchFakeEvent(byTestId('form'), 'submit');

    expect(actualSearchTerm).toBe(searchTerm);
  });
});
