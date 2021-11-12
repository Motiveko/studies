import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ofType } from '@ngrx/effects';
import { Photo } from '../models/photo';
import { photos, searchTerm } from '../spec-helpers/photo.spec-helper';

import { FlickrService } from './flickr.service';

// const expectedUrl = `https://www.flickr.com/services/rest/?tags=${searchTerm}&method=flickr.photos.search&format=json&nojsoncallback=1&tag_mode=all&media=photos&per_page=15&extras=tags,date_taken,owner_name,url_q,url_m&api_key=XYZ`;
const expectedUrl = `https://www.flickr.com/services/rest/?tags=${searchTerm}&method=flickr.photos.search&format=json&nojsoncallback=1&tag_mode=all&media=photos&per_page=15&extras=tags,date_taken,owner_name,url_q,url_m&api_key=c3050d39a5bb308d9921bef0e15c437d`;

describe('FlickrService', () => {
  let flickrService: FlickrService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Provides fake httpClient
      providers: [FlickrService],
    });
    flickrService = TestBed.inject(FlickrService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('searches for public photos', () => {
    let actualPhotos: Photo[] | undefined;
    flickrService.searchPublicPhotos(searchTerm).subscribe((otherPhotos) => {
      // Observable.subscribe 내부의 테스트는, 코드 로직상 에러가 발생해 값이 emit되지 않으면 테스트가 아예 실행되지 않으므로 옳지 않다.
      // expect(otherPhotos).toBe(photos);
      actualPhotos = otherPhotos;
    });
    const request: TestRequest = controller.expectOne(expectedUrl);

    // flush는 TestRquest에 대한 fake 응답을 반환하게한다(200ok).
    request.flush({ photos: { photo: photos } });

    // Observable이 값을 방출하지 않으면(코드에 에러가 발생하면) 실패한다.
    expect(actualPhotos).toBe(photos);

    // controller 내부에 Pending상태였던 모든 TestRqeust들에 flush, error 메서드 등으로 응답을 했는지 여부 테스트
    controller.verify();
  });

  it('passes through search errors', () => {
    const status = 500;
    const statusText = 'Server error';
    const errorEvent = new ErrorEvent('API error');

    let actualError: HttpErrorResponse | undefined;

    flickrService.searchPublicPhotos(searchTerm).subscribe(
      () => {
        // 여기로 넘어오면 테스트 실패한다.
        fail('next handler must not be called');
      },
      (error) => {
        actualError = error;
      },
      () => {
        fail('complete handler must not be called');
      }
    );

    const request = controller.expectOne(expectedUrl);
    request.error(errorEvent, { status, statusText });
    // request.flush({ foo: 'bar' }, { status, statusText });

    // type guard
    if (!actualError) {
      throw new Error('Error needs to be defined');
    }

    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});
