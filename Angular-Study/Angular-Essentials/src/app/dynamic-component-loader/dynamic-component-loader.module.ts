import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicComponentLoaderRoutingModule } from './dynamic-component-loader-routing.module';
import { AdDirective } from './ad.directive';
import { HeroProfileComponent } from "./components/hero-porfile.component";
import { HeroJobAdComponent } from './components/hero-job-ad.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { AppComponent } from './app/app.component';



@NgModule({
  declarations: [
    AdDirective,
    HeroProfileComponent,
    HeroJobAdComponent,
    HeroJobAdComponent,
    AppComponent,
    AdBannerComponent
  ],
  imports: [
    CommonModule,
    DynamicComponentLoaderRoutingModule
  ]
})
export class DynamicComponentLoaderModule { }
