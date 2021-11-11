import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { search } from 'src/app/actions/photos.actions';
import { FlickrService } from 'src/app/services/flickr.service';
import { findComponent } from 'src/app/spec-helpers/element.spec-helper';
import { photos } from 'src/app/spec-helpers/photo.spec-helper';

import { FlickrSearchComponent } from './flickr-search.component';

/**
 * Spectator를 사용하지 않는 테스트
 * 테스트는 shallow rendering, unit test

 */
describe('FlickrSearchComponent', () => {
  let fixture: ComponentFixture<FlickrSearchComponent>;
  let component: FlickrSearchComponent;
  let fakeFlikerService: Pick<FlickrService, keyof FlickrService>;

  let searchForm: DebugElement;
  let photoList: DebugElement;

  beforeEach(async () => {
    fakeFlikerService = {
      searchPublicPhotos: jasmine
        .createSpy('searchPublicPhotos')
        .and.returnValue(of(photos)),
    };
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FlickrSearchComponent],
      providers: [
        {
          provide: FlickrService,
          useValue: fakeFlikerService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FlickrSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    searchForm = fixture.debugElement.query(By.css('app-search-form'));
    photoList = fixture.debugElement.query(By.css('app-photo-list'));
  });

  it('renders the search form and the photo list, not the full photo', () => {
    expect(searchForm).toBeTruthy();
    expect(photoList).toBeTruthy();
    expect(photoList.properties.title).toBe('');
    expect(photoList.properties.photos).toEqual([]);

    expect(fixture.debugElement.query(By.css('app-full-photo'))).toBeNull();
  });

  it('searchs and passes the resulting photos to the photo list', () => {
    const searchTerm = 'searchTerm';
    searchForm.triggerEventHandler('search', searchTerm);
    fixture.detectChanges();

    expect(photoList.properties.photos).toEqual(photos);
    expect(photoList.properties.title).toBe(searchTerm);
    expect(fakeFlikerService.searchPublicPhotos).toHaveBeenCalledWith(
      searchTerm
    );
  });

  it('renders the full photo when a photo is focussed', () => {
    expect(findComponent(fixture, 'app-full-photo')).toBeNull();

    const photo = photos[0];
    photoList.triggerEventHandler('focusPhoto', photo);
    fixture.detectChanges();

    expect(component.currentPhoto).toBe(photo);
    const fullPhoto = findComponent(fixture, 'app-full-photo');
    expect(fullPhoto?.properties?.photo).toBe(photo);
  });
});
