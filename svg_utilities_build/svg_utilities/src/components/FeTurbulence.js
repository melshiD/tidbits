const FeTurbulence = (props) => {
    return(
        <feTurbulence baseFrequency={`${props.options.baseFrequencyX} ${props.options.baseFrequencyY}`} seed="0" numOctaves="1" />
    );
}

export default FeTurbulence;