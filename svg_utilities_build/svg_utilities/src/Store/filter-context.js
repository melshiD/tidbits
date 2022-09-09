import React from "react";

const FilterContext = React.createContext({
    hoveringFilterToken: false
});

export const FilterDropdownFormSettingsContext = React.createContext({
    settings:{},
    changeSettings: () => {}
});

export default FilterContext;