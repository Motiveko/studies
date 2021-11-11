import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { photo1, photo1Link } from 'src/app/spec-helpers/photo.spec-helper';
import { FullPhotoComponent } from './full-photo.component';

describe('FullPhotoComponent', () => {
  let spectator: Spectator<FullPhotoComponent>;

  const createComponent = createComponentFactory({
    component: FullPhotoComponent,
    // shallow rendering. 자식은 rendering 하지 않는다.
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({ props: { photo: photo1 } });
  });

  it('renders the photo information', () => {
    // spectator.query의 반환값은 DebugElement가 아닌 Native DOM Element or null이다.
    expect(spectator.query(byTestId('full-photo-title'))).toHaveText(
      photo1.title
    );
    const img = spectator.query(byTestId('full-photo-image'));
    expect(img).toHaveAttribute('src', photo1.url_m);
    expect(img).toHaveAttribute('alt', photo1.title);

    expect(spectator.query(byTestId('full-photo-ownername'))).toHaveText(
      photo1.ownername
    );
    expect(spectator.query(byTestId('full-photo-datetaken'))).toHaveText(
      photo1.datetaken
    );
    expect(spectator.query(byTestId('full-photo-tags'))).toHaveText(
      photo1.tags
    );
    expect(spectator.query(byTestId('full-photo-link'))).toHaveProperty(
      'href',
      photo1Link
    );
    expect(spectator.query(byTestId('full-photo-link'))).toHaveText(photo1Link);
  });
});
