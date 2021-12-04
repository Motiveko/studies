import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'uc-tool-tip',
  styleUrl: './tool-tip.css',
  shadow: true
})
export class ToolTip {

  @Prop({reflect:true}) toolTipContent

  @State() opened = false;

  timer = undefined;

  showTooltip() {
    if(this.timer) {
      clearTimeout(this.timer);
      console.log(this.timer);
    }
    
    this.opened = true;
    this.timer = setTimeout(() => {
      this.opened = false;
      clearTimeout(this.timer);
      this.timer = null;
    }, 1000)
  
  }
  render() {
    console.log('render')
    let toolTipContent = this.opened 
      ? (
        <span class="content">
          {this.toolTipContent}
        </span>
      )
      : null;
    return (
      <div>
        <slot />
        <span class="wrap">
          <span class="toolTipBtn" onClick={this.showTooltip.bind(this)}>?</span>
          { toolTipContent }
        </span>
      </div>
    )   
  }
}
