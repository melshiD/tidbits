const FeTurbulence = (props) => {
    const numOctaves = props.options.numOctaves?props.options.numOctaves: 1;
    const seed = props.options.seed?props.options.seed: 21;
    return (
        <feTurbulence baseFrequency={`${props.options.baseFrequencyX} 
                                      ${props.options.baseFrequencyY}`}
            seed="1" numOctaves="1"
        >
            {/* <animate attributeName="baseFrequency" values=".81 0.98;1.82 0.97" dur="12.5s" repeatCount="indefinite" /> */}
        </feTurbulence>
    );
}

export default FeTurbulence;