import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent {
  @Input()
  public title = '';

  @Input()
  public photos: Photo[] = [];

  @Output()
  public focusPhoto = new EventEmitter<Photo>();

  public handleFocusPhoto(photo: Photo): void {
    this.focusPhoto.emit(photo);
  }
}
