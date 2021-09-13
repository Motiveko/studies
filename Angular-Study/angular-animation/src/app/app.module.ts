import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as Animations from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpenCloseComponent } from './open-close/open-close.component';

@NgModule({
  declarations: [
    AppComponent,
    OpenCloseComponent
  ],
  imports: [
    BrowserModule,
    Animations.BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
