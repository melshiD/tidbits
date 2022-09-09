import React, { useState, useContext } from "react";
import classes from "./FilterDemoForm.module.css";
import BaseFrequencyFS from './Form-field-sets/BaseFrequencyFS';
import TurbulenceTypeFS from './Form-field-sets/TurbulenceTypeFS';
import FormExampleCircleDisplay from './FormExampleCircleDisplay.js';
import FormFilterInstances from './FormFilterInstances';
import FeTurbulence from "./FeTurbulence";
import Filter from "./Filter";
import {FilterDropdownFormSettingsContext} from '../../Store/filter-context.js';

const FilterDemoForm = (props) => {
  const filterTypeName = props.filterType;
  const [baseFreqX, setBaseFreqX] = useState(1.000);
  const [baseFreqY, setBaseFreqY] = useState(1.000);

  const updateValuesHandlerX = (currentRefVal) => {
    setBaseFreqX(currentRefVal);
  };
  const updateValuesHandlerY = (currentRefVal) => {
    setBaseFreqY(currentRefVal);
  };
  return (
    <React.Fragment>
      <div className={classes['form-container']}>
        <FormExampleCircleDisplay filterType={props.filterType}>
          <FormFilterInstances filterType={filterTypeName} 
                               options={
                                  //send bespoke packets as the state and assume the correct type will be using it?
                               } />
                {/* <FeTurbulence options={{
                  baseFrequencyX: baseFreqX,
                  baseFrequencyY: baseFreqY,
                  seed: '0',
                  numOctaves: '1'
                  }} 
                />
                <feComposite operator="in" in="SourceGraphic" /> */}
        </FormExampleCircleDisplay>
        <form className={classes.form}>
          {filterTypeName === "feTurbulence" && 
            <BaseFrequencyFS 
              changeHandlerX={updateValuesHandlerX}
              changeHandlerY={updateValuesHandlerY}
              xmin="0.001" 
              xmax="2" 
              ymin="0.001" 
              ymax="2"
            />}
          {filterTypeName === "feTurbulence" && <TurbulenceTypeFS />}
          

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
  );
};

export default FilterDemoForm;