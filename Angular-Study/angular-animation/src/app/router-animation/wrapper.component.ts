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
  prepareRoute(outlet: RouterOutlet) {
    // return outlet?.isActivated || '';  // 이렇게하면 :leave, :enter를 쿼리로 잡을수가 없다.
    return outlet?.activatedRouteData?.animation;
  }
}
