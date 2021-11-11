import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { HomeComponent } from './components/home/home.component';
import { ServiceCounterComponent } from './components/service-counter/service-counter.component';
import { NgrxCounterComponent } from './components/ngrx-counter/ngrx-counter.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ControlErrorsComponent } from './components/signup-form/control-errors/control-errors.component';
import { ErrorMessageDirective } from './components/signup-form/directives/error-message.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { FullPhotoComponent } from './components/flickr-search/full-photo/full-photo.component';
import { FlickrSearchComponent } from './components/flickr-search/flickr-search/flickr-search.component';
import { PhotoListComponent } from './components/flickr-search/photo-list/photo-list.component';
import { SearchFormComponent } from './components/flickr-search/search-form/search-form.component';
import { PhotoItemComponent } from './components/flickr-search/photo-item/photo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    HomeComponent,
    ServiceCounterComponent,
    NgrxCounterComponent,
    SignupFormComponent,
    ControlErrorsComponent,
    ErrorMessageDirective,
    FullPhotoComponent,
    FlickrSearchComponent,
    PhotoListComponent,
    SearchFormComponent,
    PhotoItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
