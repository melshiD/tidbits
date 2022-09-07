const Filter = (props) => {
    return(
        <filter id={props.id} >
            {props.children}
        </filter>
    );
}

export default Filter;