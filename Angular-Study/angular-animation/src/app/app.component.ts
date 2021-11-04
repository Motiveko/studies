import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
      panelOpenState: false,
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
