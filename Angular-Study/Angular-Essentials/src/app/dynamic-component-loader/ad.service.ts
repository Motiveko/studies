import { Injectable } from '@angular/core';
import { AdItem } from './ad-item';
import { HeroJobAdComponent } from './components/hero-job-ad.component';
import { HeroProfileComponent } from './components/hero-porfile.component';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  
  getAds(): AdItem[] {
    return [
      new AdItem(HeroProfileComponent, {name : "Motiveko", bio: "FE 개발자로 전향중.."}),
      new AdItem(HeroProfileComponent, {name : "고동기", bio: "Motiveko1의 본명.."}),
      new AdItem(HeroJobAdComponent, {headline : "Motiveko Angular공부에 빠져!?", body: "zzz"}),
      new AdItem(HeroJobAdComponent, {headLine : "고동기의 미래는?", body: "어디로 갈것인가?"}),
    ]
  }

  constructor() { }
}
