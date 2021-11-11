import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css'],
})
export class PhotoItemComponent {
  @Input()
  public photo: Photo | null = null;

  @Output()
  public focusPhoto = new EventEmitter<Photo>();

  public handleClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.photo) {
      this.focusPhoto.emit(this.photo);
    }
  }
}
