//WYSBD: WIRE UP THE FORM ELEMENTS TO ACTIVATE THE STATEUPDATE FUNCTION IN THE PARENT
//(WHERE WE;RE KEEPING A CONTEXT)
import {useContext, useRef, useEffect} from 'react';
import classes from "../FilterDemoForm.module.css";
import { FilterDropdownFormSettingsContext } from '../../../Store/filter-context';


const BaseFrequencyFS = (props) => {
	const refX = useRef(null);
	const refY = useRef(null);

	// const changeHandlerX = () =>{
	// 	props.changeHandler(refX.current.value);
	// };

	return (
		<fieldset>
			<legend className={classes.legend}>Base Frequency</legend>
			<div className={classes.label}>
				<label htmlFor="baseFrequencyX">x</label>
				<input ref={refX} onChange={() => props.changeHandlerX(refX.current.value)} 
							 type="range" 
							 name="baseFrequencyX" 
							 id="baseFrequencyX"  
							 min={props.xmin} 
							 max={props.xmax} 
							 step="0.01" 
				/>
				<span>{refX?.current?.value}</span>
			</div>

			<div className={classes.label}>
				<label htmlFor="baseFrequencyY">y:{}</label>
				<input ref={refY} onChange={() => props.changeHandlerY(refY.current.value)} type="range" name="baseFrequencyY" id="baseFrequencyY" min={props.ymin} max={props.ymax} step="0.01" />
				<span aria-hidden="true" id="baseFrequencyYDisplay">
					{refY?.current?.value || props.ymax/props.ymin}
				</span>
			</div>
		</fieldset>
	);
};

export default BaseFrequencyFS;