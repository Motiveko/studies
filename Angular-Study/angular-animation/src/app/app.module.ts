import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from './shared/shared.module';
import { BtnShakeComponent } from './btn-shake/btn-shake.component';
import { StaggerInComponent } from './stagger-in/stagger-in.component';

@NgModule({
  declarations: [AppComponent, BtnShakeComponent, StaggerInComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SwiperModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
