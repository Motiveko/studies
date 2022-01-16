import React from 'react';

export default function MouseTracker () {
  return (
    <div>
      <h1>Mouse Tracker!!!</h1>
      <Mouse render={(state) => <Apple mouse={state} />} />
    </div>
  )
}
class Apple extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mouse = this.props.mouse;
    
    return (
      <img src={require('./assets/js.png')} alt="zz" style={{
        position: 'absolute',
        width: '2rem', 
        height: '2rem', 
        left: mouse.x, 
        top: mouse.y
      }}></img>
    )
  }
}
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }

  render() {
    
    return (
      <div style={{height: "100vh", background: 'orange'}} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}