import { AfterContentInit, Component, ContentChild, HostBinding, Input } from '@angular/core';
import { InputRefDirective } from '../common/input-ref.directive';

@Component({
  selector: 'au-fa-input',
  templateUrl: './au-fa-input.component.html',
  styleUrls: ['./au-fa-input.component.css']
})
export class AuFaInputComponent implements AfterContentInit {

  @Input()
  icon: string = '';

  @ContentChild(InputRefDirective)
  input!: InputRefDirective // directive에 대한 참조

  constructor() { }

  ngAfterContentInit(): void {
    if(!this.input) {
      console.error('the au-fa-input needs an input its content');
    }
  }

  @HostBinding('class.input-focus')
  get isInputFocus() {
    return this.input ? this.input.focus : false;
  }

  get classes() {
    const cssClasses: {[key: string]: boolean} = {}
    if(this.icon) {
      cssClasses[`fa-${this.icon}`] = true;
    }
    return cssClasses;
  }
}
