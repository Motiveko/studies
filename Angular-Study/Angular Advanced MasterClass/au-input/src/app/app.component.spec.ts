import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { AppComponent } from "./app.component"
import { AuFaInputComponent } from "./lib/au-fa-input/au-fa-input.component";
import { InputRefDirective } from "./lib/common/input-ref.directive";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>,
    component: AppComponent,
    el: DebugElement,
    emailField: DebugElement;
    
  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, AuFaInputComponent, InputRefDirective
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement;
    emailField = el.query(By.css('#email-field'));
    fixture.detectChanges();
  })


  it('should create the app', () => {
    expect(component).toBeTruthy();
  })

  it('should create a font awesome email input', () => {
    expect(emailField).toBeTruthy();

  })
  it('should include the correct email icon inside the email input ', () => {
    console.log(emailField.nativeElement);
    expect(emailField.query(By.css('i.icon.fa.fa-envelope'))).toBeTruthy();
  })

  it('should have projected the correct test input inside the email field', () => {
    expect(emailField.query(By.css('input'))).toBeTruthy();
  })
})