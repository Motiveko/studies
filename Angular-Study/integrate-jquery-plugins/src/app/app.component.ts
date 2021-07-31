import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel';

@Component({
  selector: 'app-root',
  template: `
    <h2 class="title">Integrate jQuery plugin</h2>

    <div class="carousel-container" #carousel>
      <div class="carousel-item" *ngFor="let item of carouselItems">
        {{ item }}
      </div>
    </div>
  `,

  styles: [
    `
      /* Slick Custom Theme */
      .carousel-container .carousel-item {
        position: relative;
        color: white;

        background-color: #3498db;
        min-height: 250px;
        text-align: center;
      }

      .carousel-container {
        width: 500px;
        margin: 0 auto;
      }

      .carousel-item {
        font-size: 10em;
        line-height: 250px;
      }
      .slick-prev {
        left: 10px;
        z-index: 99;
      }

      .slick-next {
        right: 10px;
        z-index: 99;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  carouselItems: string[] = ['1', '2', '3'];

  @ViewChild('carousel') carousel: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    $(this.carousel.nativeElement).slick();
  }
}
