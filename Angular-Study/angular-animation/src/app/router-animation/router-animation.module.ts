import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterAnimationRoutingModule } from './router-animation-routing.module';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { WrapperComponent } from './wrapper.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [Component1Component, Component2Component, WrapperComponent],
  imports: [SharedModule, RouterAnimationRoutingModule],
})
export class RouterAnimationModule {}
