import classes from '../FilterDemoForm.module.css';

const TurbulenceTypeFS = (props) => {
	return (
		<fieldset>
			<legend className={classes.legend}>Type</legend>
			<div>
				<input type="radio" name="turbulence-type" id="turbulence" value="turbulence" defaultChecked />
				<label htmlFor="turbulence">Turbulence</label>
			</div>
			<div>
				<input type="radio" name="turbulence-type" id="fractalNoise" value="fractalNoise" />
				<label htmlFor="fractalNoise">Fractal Noise</label>
			</div>
		</fieldset>
	)
};

export default TurbulenceTypeFS;
