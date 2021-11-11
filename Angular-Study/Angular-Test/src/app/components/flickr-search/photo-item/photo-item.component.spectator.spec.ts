import { ComponentFixture, TestBed } from '@angular/core/testing';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { Photo } from 'src/app/models/photo';
import { photo1 } from 'src/app/spec-helpers/photo.spec-helper';

import { PhotoItemComponent } from './photo-item.component';

describe('PhotoItemComponent', () => {
  const createComponent = createComponentFactory({
    component: PhotoItemComponent,
    shallow: true,
  });
  let spectator: Spectator<PhotoItemComponent>;

  beforeEach(() => {
    spectator = createComponent({ props: { photo: photo1 } });
  });

  it('focusses a photo on click', () => {
    let photo: Photo | undefined;
    spectator.component.focusPhoto.subscribe(
      (otherPhoto) => (photo = otherPhoto)
    );
    spectator.click(byTestId('photo-item-link'));

    expect(photo).toBe(photo1);
  });
});
