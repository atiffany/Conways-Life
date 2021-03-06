import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [0x0e, 0x18, 0x20],
  [0x00, 0x07, 0x6f],
  [0xff, 0xe4, 0xf2],
  [0xe5, 0x4e, 0xd0],
  [0x9f, 0x45, 0xb0],
  [0x44, 0x00, 0x8b]
];

/**
 * Life canvas
 */
class LifeCanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.life = new Life(props.width, props.height);
    this.life.randomize();
    this.state = {
      stillGoing: true
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
  }

  beginAnimation() {
    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const height = this.props.height;
    const width = this.props.width;
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, width, height);

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let index = (h * width + w) * 4;
        let lifeStatus = cells[h][w];
        let color = COLORS[lifeStatus];

        imageData.data[index + 0] = color[0]; // red
        imageData.data[index + 1] = color[1]; // green
        imageData.data[index + 2] = color[2]; // blue
        imageData.data[index + 3] = 0xff; // alpha - opaque
      }
    }
    // put image data on the canvas
    ctx.putImageData(imageData, 0, 0);

    // iterate the life
    this.life.step();

    // request new animation frame
      requestAnimationFrame(() => { this.animFrame() });
  }

  /**
   * Render
   */
  render() {
    return (
      <div>
        <canvas ref="canvas" width={this.props.width} height={this.props.height} />
        <div>
          <button onClick={this.beginAnimation()} >Begin Animation</button>
          <button onClick = {console.log('test')} >End Animation</button>
        </div>
      </div>
    );
  }
}

/**
 * Outer App component
 */
class App extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className="App">
        <LifeCanvas width = {1400} height = {900} />
      </div>
    );
  }
}

export default App;
