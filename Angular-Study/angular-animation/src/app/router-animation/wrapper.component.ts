import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimationUsingChilds } from './router-animation';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
  animations: [routeAnimationUsingChilds],
})
export class WrapperComponent {
  flag = 0;

  prepareRoute(outlet: RouterOutlet) {
    console.log(outlet?.activatedRouteData?.animation);
    return outlet?.activatedRouteData?.animation;
    // return outlet?.isActivated || '';
  }
}
