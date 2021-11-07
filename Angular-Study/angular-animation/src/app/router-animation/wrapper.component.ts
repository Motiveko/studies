import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { routeAnimationUsingChilds } from './router-animation';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
  // animations: [routeAnimationUsingChilds],
})
export class WrapperComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.isActivated || '';
  }
}
