//lets just agree for now that when someone clicks away from the form,
//upon returning the state will be new and reset... for now
import React, { useState, useContext } from "react";
import classes from "./FilterDemoForm.module.css";
import BaseFrequencyFS from './Form-field-sets/BaseFrequencyFS';
import TurbulenceTypeFS from './Form-field-sets/TurbulenceTypeFS';
import FormExampleCircleDisplay from './FormExampleCircleDisplay.js';
import FormFilterInstances from './FormFilterInstances';
import { FormFilterOptionsContext } from "../../Store/filter-context";
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
    <FormFilterOptionsContext.Provider value={1}>
      <div className={classes['form-container']}>
        <FormExampleCircleDisplay filterType={props.filterType}>
          <FormFilterInstances 
            //will have to TOTALLY rethink how I'm passing state here
            //these are the values set by the sliders provided with the
            //fieldset components (FS)
            filterType={filterTypeName} 
            options={
              {baseFrequencyX: baseFreqX,
               baseFrequencyY: baseFreqY}
            } 
            //options is the part that needs to be super dynamic for each 
            //different filter type selection
          />
        </FormExampleCircleDisplay>
        <form className={classes.form}>
          {filterTypeName === "feTurbulence" && 
          //FIELD SETS 'SERVER' goes here, and the FS's get nested
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
    </FormFilterOptionsContext.Provider>
  );
};

export default FilterDemoForm;