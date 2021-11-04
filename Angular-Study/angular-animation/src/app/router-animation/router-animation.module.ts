import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterAnimationRoutingModule } from './router-animation-routing.module';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { WrapperComponent } from './wrapper.component';


@NgModule({
  declarations: [
    Component1Component,
    Component2Component,
    WrapperComponent
  ],
  imports: [
    CommonModule,
    RouterAnimationRoutingModule
  ]
})
export class RouterAnimationModule { }
