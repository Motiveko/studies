import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { FlickrService } from 'src/app/services/flickr.service';
import { photo1, photos } from 'src/app/spec-helpers/photo.spec-helper';
import { FullPhotoComponent } from '../full-photo/full-photo.component';
import { PhotoListComponent } from '../photo-list/photo-list.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FlickrSearchComponent } from './flickr-search.component';

describe('FlickrSearchComponent with spectator', () => {
  let spectator: Spectator<FlickrSearchComponent>;

  let searchForm: SearchFormComponent | null;
  let photoList: PhotoListComponent | null;
  let fullPhoto: FullPhotoComponent | null;

  const createComponent = createComponentFactory({
    component: FlickrSearchComponent,
    shallow: true,

    declarations: [
      // 추상화된 DebugElement가 아닌 RealType의 객체를 사용할 수 있다.
      MockComponents(
        SearchFormComponent,
        PhotoListComponent,
        FullPhotoComponent
      ),
    ],
    /**
     * 테스트 모듈에 FlickerService 정의
     * component.spec.ts 에서 fakeFlickrService 를 만든것과 동일한 방법으로 spy를 구현
     * 내부적으로 기본적으로 jasmine을 사용하여 spy를 만든다.(Jest로 바꿀수도 있음)
     */
    providers: [mockProvider(FlickrService)],
  });

  beforeEach(() => {
    spectator = createComponent();

    // TestBed.inject와 같은 역할의 inject 서비스의 stubbing은 최종적으로 이런식으로해준다.
    spectator
      .inject(FlickrService)
      .searchPublicPhotos.and.returnValue(of(photos));

    // 자식 컴포넌트는 컴포넌트 타입으로 쿼리가 가능하다.
    searchForm = spectator.query(SearchFormComponent);
    photoList = spectator.query(PhotoListComponent);
    fullPhoto = spectator.query(FullPhotoComponent);
  });

  it('renders the search form and the photo list, not the full photo', () => {
    /**
     * null 체크 후 error를 던져줘야 타입스크립트에서 photoList: PhotoListComponent로 인식하게 된다.
     * 이런걸 TypeScript type guard 라고 하는데, expect()가 type guard였다면
     * expect(photoList).not.toBe(null); 를 먼저 쓰면 이후로는 타입스크립트가 PhotoList를 null이 아닌것으로 인식했을 것이다.
     */
    if (!(searchForm && photoList)) {
      throw new Error('searchForm or photoList not found');
    }
    expect(photoList.title).toBe('');
    expect(photoList.photos).toEqual([]);
    expect(fullPhoto).not.toExist();
  });

  it('searchs and passes the resulting photos to the photo list', () => {
    if (!(searchForm && photoList)) {
      throw new Error('searchForm or photoList not found');
    }
    const searchTerm = 'searchTerm';

    searchForm.search.emit(searchTerm);

    spectator.detectChanges();

    const flicrService = spectator.inject(FlickrService);
    expect(flicrService.searchPublicPhotos).toHaveBeenCalledWith(searchTerm);

    expect(photoList.title).toBe(searchTerm);
    expect(photoList.photos).toEqual(photos);
  });

  it('renders the full photo when a photo is focussed', () => {
    expect(fullPhoto).not.toExist();

    if (!photoList) {
      throw new Error('photoList not found');
    }

    photoList.focusPhoto.emit(photo1);

    spectator.detectChanges();

    // 다시 쿼리해줘야한다. 변화를 감지하진 못하는듯 하다.
    fullPhoto = spectator.query(FullPhotoComponent);

    if (!fullPhoto) {
      throw new Error('fullPhoto not found');
    }

    expect(fullPhoto.photo).toBe(photo1);
    expect(spectator.component.currentPhoto).toBe(photo1);
  });
});
