//the function of this component is to supply the FormExampleCircleDisplay with
//an appropriately id'd filter to be applied.  At this time, only ONE FILTER,
//with one preset set of primitives each will be abailable to the circle in the dropdown form 
import React, { useContext, useState, useEffect } from 'react';
import FeTurbulence from './FeTurbulence';

const FormFilterInstances = (props) => {
	const [filterSettings, setFilterSettings] = useState({});
	const filterType = props.filterType;
		return(
			<React.Fragment>
				{filterType === "feTurbulence" &&
						<FeTurbulence options={{baseFrequencyX: 1, baseFrequencyY: 1}}>

						</FeTurbulence>
				}
			</React.Fragment>
		);
};

export default FormFilterInstances;