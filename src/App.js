import React from 'react';
import {ReactDOM} from 'react-dom';
import {TwoZeroFourEightMap} from './utils/TwoZeroFourEightMap.js'

import MatrixItem from './components/MatrixItem';

import DirectionTypes from './constants/DirectionTypes.js';
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    //window.tzfeMap is for develpoment
    window.tzfeMap = this.tzfeMap = new TwoZeroFourEightMap();
    this.tzfeMap.fillAZeroPoint();

    this.state = { mapState: this.tzfeMap.getCatch() }
    this.bgMap = new TwoZeroFourEightMap();
  }
  componentDidMount() {
    this.addKeyEvent();
  }
  addKeyEvent() {
    const that = this;
    document.addEventListener('keydown', function(event) {
      let direction;
      switch (event.keyCode) {
        case 37:
          direction = DirectionTypes.LEFT;
          break;
        case 38:
          direction = DirectionTypes.UP;
          break;
        case 39:
          direction = DirectionTypes.RIGHT;
          break;
        case 40:
          direction = DirectionTypes.DOWN;
          break;
        default:
          return;
      }

      that.tzfeMap.mergeItems(direction);
      const map = that.tzfeMap.getCatch();
      console.log(map)
      that.setState({
        mapState: map
      })
      setTimeout(()=> {
        that.tzfeMap.fillAZeroPoint()
      }, 300);
      setTimeout(()=> {
        that.setState({
          mapState: map
        })
      }, 300)
      console.log(direction)
    }, false);
  }
  render() {
    const {mapState} = this.state;
    const bgGrid = this.bgMap.getCatch();
    return (
      <div className="app">
        <section className="app-header">
          <button>开始游戏</button>
        </section>
        <section className="app-2048">
          <div className="blocklist__wrap">
            <ul className="app-2048__blocklist">
              {mapState.map((block) => (
                <MatrixItem key={block.keyProp} {...block} />
              ))}
            </ul>
            <ul className="app-2048__blocklist grid-bg">
              {bgGrid.map((block) => (
                <MatrixItem key={block.keyProp} {...block} />
              ))}
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

export default App;
