import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from 'src/spec-helpers/element.spec-helper';

import { OpenCloseComponent } from './open-close.component';

describe('OpenCloseComponent', () => {
  let component: OpenCloseComponent;
  let fixture: ComponentFixture<OpenCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCloseComponent ],
      imports: [ NoopAnimationsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggle-button 클릭시 toggle()호출', () => {
    
    // Arrange(given)

    // Act(when)
    const toggleButton = fixture.debugElement.query(By.css('[data-testid=toggle-button]'));
    expect(component.isOpen).toBe(true);
    toggleButton.triggerEventHandler('click', null);
    
    // Assert(then)
    expect(component.isOpen).toBe(false);
  })

  it('toggle-button 클릭시 container style 변경', () => {
    
    const openCloseContainer = fixture.debugElement.query(By.css(`[data-testid=open-close-container]`))

    
    let opacity = openCloseContainer.styles['opacity'];

    expect(component.isOpen).toBe(true);
    expect(opacity).toBe('1');

    click(fixture, 'toggle-button');
    fixture.detectChanges();
    
    /**
     * setTimeout 내부의 비동기 assertion들은 제대로 실행이 되지 않는듯하다.
     * 그런데 animation이 animation의 transition은 시간이 걸리는 비동기적인 작동을 하므로 click후 detectChange하면 style값이 empty다. 
     * 어떻게 테스트하는지는 찾아봐야할듯
     */
    console.log(openCloseContainer);
    setTimeout(() => { 
      opacity = openCloseContainer.styles['opacity'];
      expect(opacity).toBe('0.5');
      expect(component.isOpen).toBe(false);
      expect(false).toBe(true);
    }, 1100);

  })
});
