import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `

    <a [routerLink]="['/directives']">Directives</a>
    <a [routerLink]="['/dynamic-component-loader']">Dynamic Component Loader</a>
  
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Angular-Essentials';
}
