const Svg = (props) => {
    const {width, height, viewBox} = props;
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 200 200"
            // width={width}
            // height={height}
            // viewBox={viewBox}
            role="img"
            aria-labelledby="title"
      >
        {props.children}
      </svg>
    )
}

export default Svg;
