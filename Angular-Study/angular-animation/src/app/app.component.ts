import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimation],
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }
  navs = [
    {
      url: '/btn-shake',
      label: 'Button Shake',
      hasChildren: false,
    },
    {
      url: '/router-animation',
      label: 'Router Animation',
      hasChildren: true,
      panelOpenState: true,
      children: [
        {
          url: '/component1',
          label: 'Component 1',
        },
        {
          url: '/component2',
          label: 'Component 2',
        },
      ],
    },
    {
      url: '/stagger-in',
      label: 'Stagger In Animation',
      hasChildren: false,
    },
  ];
}
