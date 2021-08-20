import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesRoutingModule } from './directives-routing.module';
import { MyNgIfDirective } from './my-ng-if.directive';
import { AppComponent } from './app/app.component';


@NgModule({
  declarations: [
    MyNgIfDirective,
    AppComponent
  ],
  imports: [
    CommonModule,
    DirectivesRoutingModule
  ]
})
export class DirectivesModule { }
