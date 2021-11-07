import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // trigger('routerAnimation', [
    //   transition('* => *', [query('@*', animateChild(), { optional: true })]),
    // ]),
  ],
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.isActivated || '';
  }
  navs = [
    {
      url: '/btn-shake',
      label: 'Button Shake',
      hasChilren: false,
    },
    {
      url: '/router-animation',
      label: 'Router Animation',
      hasChilren: true,
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
  ];
}
