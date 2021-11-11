import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { Photo } from 'src/app/models/photo';
import { click, findEl } from 'src/app/spec-helpers/element.spec-helper';
import { photo1 } from 'src/app/spec-helpers/photo.spec-helper';

import { PhotoItemComponent } from './photo-item.component';

describe('PhotoItemComponent', () => {
  let component: PhotoItemComponent;
  let fixture: ComponentFixture<PhotoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoItemComponent);
    component = fixture.componentInstance;
    component.photo = photo1;
    fixture.detectChanges();
  });
  it('renders a link and a thumbnail', () => {
    const link = fixture.debugElement.query(
      By.css('[data-testid="photo-item-link"]')
    );
    const img = fixture.debugElement.query(
      By.css('[data-testid="photo-item-image"]')
    );

    expect(link.properties.href).toContain(`${photo1.owner}/${photo1.id}`);
    expect(img.properties.src).toBe(photo1.url_q);
    expect(img.properties.alt).toBe(photo1.title);
  });
  it('focusses a photo on click', () => {
    fixture.detectChanges();

    let emittedPhoto: Photo | undefined;

    component.focusPhoto
      .pipe(tap((photo) => console.log('하잉', photo)))
      .subscribe((photo) => (emittedPhoto = photo));

    click(fixture, 'photo-item-link');

    expect(emittedPhoto).toBe(photo1);
  });
  it('does nothing when the photo is null', () => {
    component.photo = null;
    fixture.detectChanges();

    expect(findEl(fixture, 'photo-item-link')).toBeNull();
  });
});
