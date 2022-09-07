import React, { useEffect, useState, useRef } from 'react';
import './Dropdown.css';
import SideFilterExample from '../Filter-components/SideFilterExample';
import classes from '../Layout/Dropdown.css';

const DUMMY_DATA = [
    {id: 1,
    value: "feTurbulence"
    },
    {
      id: 2,
      value: 'feDiffuseLight'
    },
    {
      id: 3,
      value: 'Monster Bacon'
    },
    {
      id: 4,
      value: 'Vader in Paris'
    },
    {
        id: 5,
        value: "Pulp Fiction"
    },
    {
      id: 6,
      value: 'Once upon a time in Hollywood'
    },
    {
      id: 7,
      value: 'Monster Bacon'
    },
    {
      id: 8,
      value: 'Vader in Paris'
    },
    {
      id: 9,
      value: 'Once upon a time in Hollywood'
    },
    {
      id: 10,
      value: 'Monster Bacon'
    },
    {
      id: 11,
      value: 'Vader in Paris'
    }
  ];

const Dropdown = ({ title, items = DUMMY_DATA, multiSelect = false }) => {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const [hoveringFilterToken, setHoveringFilterToken] = useState('');
    const toggle = () => setOpen(!open);
    const ref = useRef(null);

    useEffect( () => {
        document.addEventListener('click', handleClickOutside)
    }, []);

    const handleClickOutside = (e) => {
        if(!ref.current.contains(e.target)){
            setOpen(false);
            setHoveringFilterToken(null);
        }
    }

    const handleOnClick = (item) => {
        if(!selection.some(current => current.id === item.id)){
            if(!multiSelect){
                setSelection([item]);
            }
            else if(multiSelect){
                setSelection([...selection, item])
            }
        }
        else{
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                (current) => (
                    current.id !== item.id
                )
            );
            setSelection([...selectionAfterRemoval]);
        }
    };

    const handleMouseOver = (filterToken) => {
        if(filterToken !== hoveringFilterToken){
            setHoveringFilterToken(filterToken);
        }
    };

    return (
        <div className="container" >
            <div className="dd-wrapper" ref={ref}>
                <div
                    tabIndex={0}
                    className="dd-header"
                    role="button"
                    onKeyPress={() => toggle(!open)}
                    onClick={() => toggle(!open)}
                >
                    <div className="dd-header__title">
                        <p className="dd-header__title--bold">{title}</p>
                    </div>
                </div>
                {open && (
                        <ul className='dd-list'>
                            {items.map(item => (
                                <li className='dd-list-item' key={item.id}>
                                    <button type="button" 
                                            onClick={() => handleOnClick(item)}
                                            onMouseOver={() => handleMouseOver(item.value)}
                                    >
                                        <span>{item.value}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                )}
            </div>
        </div>
    );
};

const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handClickOutside
}

export default Dropdown;
// export default onClickOutside(Dropdown, clickOutsideConfig);