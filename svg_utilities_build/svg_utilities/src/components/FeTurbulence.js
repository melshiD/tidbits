const FeTurbulence = (props) => {
    return(
        <feTurbulence baseFrequency={`${props.options.baseFrequencyX} 0.1`} seed="0" numOctaves="1" />
    );
}

export default FeTurbulence;