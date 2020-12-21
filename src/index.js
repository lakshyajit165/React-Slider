import React, { Component } from "react";
import { render } from "react-dom";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./components"; // example render components - source below

const sliderStyle = {
  position: "relative",
  width: "100%"
};

const domain = [1000000, 2000000];
const defaultValues = [1000000, 2000000];
class App extends Component {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice()
  };

  onUpdate = (update) => {
    this.setState({ update });
    // console.log(this.state.update);
  };
  // onUpdate = () => {
  //   console.log("updated");
  //   console.log(this.state.defaultValues);
  //   console.log(domain);
  // };
  render() {
    const {
      state: { values, update }
    } = this;

    return (
      <div style={{ margin: "10%", height: 120, width: "80%" }}>
        <div
          style={{
            marginBottom: "30px",
            marginLeft: "0",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div>Initial: {this.state.update[0]}</div>

          <div>Final: {this.state.update[1]}</div>
        </div>

        <Slider
          mode={2}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={1}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map((tick) => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
