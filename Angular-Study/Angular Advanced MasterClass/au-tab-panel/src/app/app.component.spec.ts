import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';




describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AppComponent]
        }).compileComponents();
        
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('App component test', () => {
        expect(component).toBeTruthy();
    })
});

















