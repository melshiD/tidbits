import logo from './logo.svg';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <svg
        width="200"
        height="200"
        viewBox="0 0 100 100"
        role="img"
        aria-labelledby="title"
      >
        <title id="title">
          A Turbulent World
        </title>

        <defs>
          <filter id="my-filter">
            <feTurbulence baseFrequency="0.1" seed="0" numOctaves="1" />
            <feComposite operator="in" in="SourceGraphic" />
          </filter>
        </defs>

        <circle cx="50" cy="50" r="50" filter="url('#my-filter')" />
      </svg>

      <form>
        <fieldset>
          <legend>Base Frequency</legend>
          <div>
            <label for="baseFrequencyX">x</label>
            <input type="range" name="baseFrequencyX" id="baseFrequencyX" value="0.1" min="0.01" max="2" step="0.01"/>
              <span aria-hidden="true" id="baseFrequencyXDisplay">0.01</span>
          </div>
          <div>
            <label for="baseFrequencyY">y</label>
            <input type="range" name="baseFrequencyY" id="baseFrequencyY" value="0.1" min="0.01" max="2" step="0.01"/>
              <span aria-hidden="true" id="baseFrequencyYDisplay">0.01</span>
          </div>
        </fieldset>
        <fieldset>
          <legend>Type</legend>
          <div>
            <input type="radio" name="type" id="turbulence" value="turbulence" checked/>
              <label for="turbulence">Turbulence</label>
          </div>
          <div>
            <input type="radio" name="type" id="fractalNoise" value="fractalNoise"/>
              <label for="fractalNoise">Fractal Noise</label>
          </div>
        </fieldset>

        <div class="fake-fieldset">
          <label for="seed">Seed</label>
          <input type="number" name="seed" id="seed" value="0" />
        </div>

        <div class="fake-fieldset">
          <label for="numOctaves">Octaves</label>
          <input type="number" name="numOctaves" id="numOctaves" value="1" />
        </div>
      </form>
    </div>
  );
}

export default App;
