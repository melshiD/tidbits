import classes from "./FilterDemoForm.module.css";


const FormExampleCircleDisplay = (props) => {
	return(
		<svg className={classes.svg}>
          <filter id="this_filter">
            {props.children}
          </filter>
          <circle cx="50%" cy="50%" r="70" filter="url(#this_filter)"/>
          {/* <circle cx="50%" cy="50%" r="70" filter="url(#)" fill="pink"/> */}
        </svg>
	)
};

export default FormExampleCircleDisplay;