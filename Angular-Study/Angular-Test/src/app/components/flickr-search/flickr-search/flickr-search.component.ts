import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-flickr-search',
  templateUrl: './flickr-search.component.html',
  styleUrls: ['./flickr-search.component.css'],
})
export class FlickrSearchComponent {
  public searchTerm = '';
  public photos: Photo[] = [];
  public currentPhoto: Photo | null = null;

  constructor(private flickrService: FlickrService) {}

  public handleSearch(searchTerm: string): void {
    this.flickrService.searchPublicPhotos(searchTerm).subscribe((photos) => {
      this.searchTerm = searchTerm;
      this.photos = photos;
      this.currentPhoto = null;
    });
  }

  public handleFocusPhoto(photo: Photo): void {
    this.currentPhoto = photo;
  }
}
