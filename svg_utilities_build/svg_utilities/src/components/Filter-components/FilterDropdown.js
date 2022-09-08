import Dropdown from "../Layout/Dropdown";
import React, { useEffect, useState, useRef } from 'react';
import '../Layout/Dropdown.css';
import FilterDemoForm from './FilterDemoForm';


//needs refactored with Dropdown, but this one manages some state the others dont

const FilterDropdown = ({title, items, 
                        multiSelect=false, 
                        displayFilterForm=false,
                 }) => {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const [hoveringFilterToken, setHoveringFilterToken] = useState('');
    const toggle = () => setOpen(!open);
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    }, []);

    const handleClickOutside = (e) => {
        if (!ref.current.contains(e.target)) {
            setOpen(false);
            setHoveringFilterToken(null);
        }
    }

    const handleOnClick = (item) => {
        if (!selection.some(current => current.id === item.id)) {
            if (!multiSelect) {
                setSelection([item]);
            }
            else if (multiSelect) {
                setSelection([...selection, item])
            }
        }
        else {
            if(selection.find(current => current.id === item.id)){
                let selectionAfterRemoval = selection;
                selectionAfterRemoval = selectionAfterRemoval.filter(
                    (current) => (
                        current.id !== item.id
                    )
                );
                setSelection([...selectionAfterRemoval]);
            }
            else{
                return;
            }
        }
    };

    const handleMouseOver = (filterToken) => {
        if (filterToken !== hoveringFilterToken) {
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
                                {item.value === selection[0]?.value &&
                                 <FilterDemoForm filterType={selection[0]?.value}/>
                                }
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FilterDropdown;
