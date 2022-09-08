import classes from "../FilterDemoForm.module.css";

const BaseFrequencyFS = (props) => {
	return (
		<fieldset>
			<legend className={classes.legend}>Base Frequency</legend>
			<div className={classes.label}>
				<label htmlFor="baseFrequencyX">x</label>
				<input type="range" name="baseFrequencyX" id="baseFrequencyX" value='1' min={props.xmin} max={props.xmax} step="0.01" />
				{/* <span aria-hidden="true" id="baseFrequencyXDisplay">122</span> */}
			</div>
			<div className={classes.label}>
				<label htmlFor="baseFrequencyY">y</label>
				<input type="range" name="baseFrequencyY" id="baseFrequencyY" value='1' min="0.01" max="2" step="0.01" />
				<span aria-hidden="true" id="baseFrequencyYDisplay"></span>
			</div>
		</fieldset>
	);
};

export default BaseFrequencyFS;