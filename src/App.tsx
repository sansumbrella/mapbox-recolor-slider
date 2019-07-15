import React, { PureComponent } from "react";
import "./App.css";
import { MapContainer } from "./MapContainer";

interface State {
  sliderValue: number;
}

interface Props {}

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sliderValue: 0.0
    };
  }
  render() {
    const { sliderValue } = this.state;
    return (
      <div className="App">
        <MapContainer
          accessToken="pk.eyJ1IjoiZGF2aWQtd2lja3MiLCJhIjoiY2p5NGpqN3p6MDBoYzNncDhoM283ZjNubSJ9.CR6hBpiQ37nyNGIcdgffbQ"
          buildingPalette={[{ h: 0.0, s: 0.0, l: 1.0 }, { h: 0.1, s: 0.1, l: 0.15 }]}
          waterPalette={[{ h: 0.6, s: 0.5, l: 0.8 }, { h: 0.61, s: 0.5, l: 0.25 }]}
          landPalette={[{ h: 0.1, s: 0.1, l: 0.89 }, { h: 0.59, s: 0.17, l: 0.31 }]}
          // buildingPalette={[{ h: 0.0, s: 0.0, l: 1.0 }, { h: 0.1, s: 0.1, l: 0.15 }]}
          // waterPalette={[{ h: 0.6, s: 0.5, l: 0.8 }, { h: 0.61, s: 0.5, l: 0.25 }]}
          palettePosition={sliderValue}
        />
        <div className="controls">
          <label htmlFor="mix">Mix</label>
          <input
            type="range"
            name="mix"
            min="0"
            max="1"
            step="0.01"
            value={sliderValue}
            onChange={amt => {
              this.setState({
                sliderValue: parseFloat(amt.target.value)
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
