const FeTurbulence = (props) => {
    return(
        <feTurbulence baseFrequency={`${props.options.baseFrequencyX} 
                                      ${props.options.baseFrequencyY}`} 
                                      seed="0" numOctaves="1" 
        >
            {/* <animate attributeName="baseFrequency" values=".81 0.98;1.82 0.97" dur="12.5s" repeatCount="indefinite" /> */}
        </feTurbulence>
    );
}

export default FeTurbulence;