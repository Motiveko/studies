import { Component, OnInit } from '@angular/core';
import { AdItem } from '../ad-item';
import { AdService } from '../ad.service';

@Component({
  selector: 'app-app',
  template: `
    <div class="test">
      zzz
      <app-ad-banner [ads]="ads"></app-ad-banner>
    </div>
  `,
  styleUrls: ['../styles.css']
})
export class AppComponent implements OnInit {
  ads!: AdItem[];
  constructor(private adService: AdService) { }
  ngOnInit(): void {
    this.ads = this.adService.getAds();
  }

}
