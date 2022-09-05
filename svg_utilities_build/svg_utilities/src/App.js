import React, { useState, useRef, useEffect } from "react";
import './App.css';
import Filter from "./components/Filter";
import FeTurbulence from "./components/FeTurbulence";
import Svg from "./components/Svg";
import Layout from "./components/Layout/Layout";

function App() {
  const [baseFrequencyX, setBaseFrequencyX] = useState('0.1');
  const [baseFrequencyY, setBaseFrequencyY] = useState('0.1');

  const baseFreqXRef = useRef(null);
  const baseFreqYRef = useRef(null);

  const baseFreqChangeHandler = (value, freqComponent) => {
    freqComponent == 'y' ? setBaseFrequencyY(value) : setBaseFrequencyX(value);
  }

  return (
    <React.Fragment>
      <Layout>
      <div className="App">
      <Svg className="svg-image" viewBox="0 0 200 200">
        <title id="title">
          A Turbulent World
        </title>

        <defs>
          <Filter id="my_filter">
            <FeTurbulence options={{
              baseFrequencyX,
              baseFrequencyY,
              seed: '0',
              numOctaves: '1'
            }}
            />
            <feComposite operator="in" in="SourceGraphic" />
          </Filter>
          <filter id="blur">
            <feGaussianBlur stdDeviation="4"></feGaussianBlur>
          </filter>
        </defs>

        <circle cx="100" cy="50" r="150" filter="url('#my_filter')" />
      </Svg>
      <div className="filter-div">
        {/* WHEN YOU SIT BACK DOWN, FIGURE OUT HOW TO DESIGN THE FILTER INTERFACE  */}
        <form>
          <fieldset>
            <legend>Base Frequency</legend>
            <div>
              <label htmlFor="baseFrequencyX">x</label>
              <input ref={baseFreqXRef} onChange={(e) => baseFreqChangeHandler(e.target.value, 'x')} type="range" name="baseFrequencyX" id="baseFrequencyX" value={baseFrequencyX} min="0.01" max="2" step="0.01" />
              <span aria-hidden="true" id="baseFrequencyXDisplay">{baseFrequencyX}</span>
            </div>
            <div>
              <label htmlFor="baseFrequencyY">y</label>
              <input ref={baseFreqYRef} onChange={(e) => baseFreqChangeHandler(e.target.value, 'y')} type="range" name="baseFrequencyY" id="baseFrequencyY" value={baseFrequencyY} min="0.01" max="2" step="0.01" />
              <span aria-hidden="true" id="baseFrequencyYDisplay">{baseFrequencyY}</span>
            </div>
          </fieldset>
          <fieldset>
            <legend>Type</legend>
            <div>
              <input type="radio" name="type" id="turbulence" value="turbulence" checked />
              <label htmlFor="turbulence">Turbulence</label>
            </div>
            <div>
              <input type="radio" name="type" id="fractalNoise" value="fractalNoise" />
              <label htmlFor="fractalNoise">Fractal Noise</label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="seed">Seed</label>
            <input type="number" name="seed" id="seed" value="0" />
          </div>

          <div>
            <label htmlFor="numOctaves">Octaves</label>
            <input type="number" name="numOctaves" id="numOctaves" value="1" />
          </div>
        </form>
      </div>

    </div>
      </Layout>
    </React.Fragment>
  );
}

export default App;
