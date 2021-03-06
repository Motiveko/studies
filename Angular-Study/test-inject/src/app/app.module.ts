import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Data1Component } from './data1/data1.component';
import { Data2Component } from './data2/data2.component';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InMemoryDbService, HttpClientInMemoryWebApiModule, InMemoryBackendConfigArgs } from 'angular-in-memory-web-api';
import { InMemHeroService } from './in-mem-hero.service';

const inMemoryOptions: InMemoryBackendConfigArgs= {
  // apiBase: '/api',
  host: 'http://localhost:8082',
  delay : 1000
}

@NgModule({
  declarations: [
    AppComponent,
    Data1Component,
    Data2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // prod 환경이 아닐때만 HttpClientInMemoryWebApiModule 의존성을 주입해 http client의 요청을 mocking한다.
    environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(InMemHeroService, inMemoryOptions),  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
