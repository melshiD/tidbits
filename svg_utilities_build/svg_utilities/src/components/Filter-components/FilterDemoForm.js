import React from "react";
import classes from "./FilterDemoForm.module.css";
import BaseFrequencyFS from './Form-field-sets/BaseFrequencyFS';

const FilterDemoForm = (props) => {
  const tokenName = props.filterType;
  console.log(tokenName);
  return (
    <React.Fragment>
      <div className={classes['form-container']}>
        <svg className={classes.svg}>
          <filter id="">
            {/* filter definition goes here  */}
          </filter>
          <circle cx="50%" cy="50%" r="70" filter="url(#)" />
        </svg>
        <form className={classes.form}>
          {tokenName === "feTurbulence" && <BaseFrequencyFS xmin="0.001" xmax="2" ymin="0.001" ymax="2"/>}
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
    </React.Fragment>
  )
};

export default FilterDemoForm;