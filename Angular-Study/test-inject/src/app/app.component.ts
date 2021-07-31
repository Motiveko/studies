import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import {AppConfig, APP_CONFIG} from './AppConfig'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-inject';
  constructor(
    @Inject(APP_CONFIG) public appConfig: AppConfig,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('home component:')
    console.log(appConfig);
  }
  ngOnInit(): void {
   
    // console.log(environment.production)
   
    // this.apiService.get('heros').subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err),
    //   () => console.log('call heros api complete')
    // )
   
    // this.apiService.get('persons').subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err),
    //   () => console.log('call persons api complete')      
    // )
    
    // this.route.params.subscribe(
    // )
  }
  
}
