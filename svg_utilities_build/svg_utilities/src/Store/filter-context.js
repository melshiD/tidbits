import React from "react";

const FilterContext = React.createContext({
    hoveringFilterToken: false
});

export const FormFilterOptionsContext = React.createContext({
    options:{},
    changeOptions: () => {}
    //these default settings are mostly here for IDE completion 
    //suggestions I believe
});

export default FilterContext;