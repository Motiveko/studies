import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { OpenCloseComponent } from './open-close/open-close.component';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let app: AppComponent
  let openClose: OpenCloseComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent, MockComponent(OpenCloseComponent)
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    app = fixture.componentInstance;
    
    let openCloseEl = fixture.debugElement.query(By.directive(OpenCloseComponent));
    openClose = openCloseEl.componentInstance;

  });

  it('appComponent 랜더링', () => {
    expect(app).toBeTruthy();
  });

  it('openCloseComponent 랜더링', () => {
    expect(openClose).toBeTruthy();
  });

  // it('should render title', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('angular-animation app is running!');
  // });
});
