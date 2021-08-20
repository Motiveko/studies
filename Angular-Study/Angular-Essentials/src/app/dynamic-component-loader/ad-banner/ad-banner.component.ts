import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AdItem } from '../ad-item';
import { AdComponent } from '../ad.component';
import { AdDirective } from '../ad.directive';

@Component({
  selector: 'app-ad-banner',
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <ng-template adHost></ng-template>
    </div>
  `,
  styleUrls: ['../styles.css']

})
export class AdBannerComponent implements OnInit, OnDestroy{

  @Input('ads') ads: AdItem[] = [];

  currentAdIndex = -1;
  // static : true ?
  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  interval: number | undefined;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 12312312);
  }

  loadComponent() {
    
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem: AdItem = this.ads[this.currentAdIndex];
  
    const componentFactory: ComponentFactory<AdComponent> = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear()

    // Directive의 vieContainerRef.createComponent()로 DOM에 AdComponent Component 추가
    const componentRef = viewContainerRef.createComponent(componentFactory);

    componentRef.instance.data = adItem.data;
  
  }

}
