import React from 'react';
import classes from './TopNav.module.css';
import Dropdown from './Dropdown';
import supportedFilters from '../resources/supportedFilters';

const TopNav = () => {
    const dropdownButtonHandler = (e) => {
        let currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');

        document.querySelector('[data-dropdown].active').forEach(dropdown => {
            if(dropdown === currentDropdown) return;
            dropdown.classList.remove('active');
        })
    };

    return (
        <React.Fragment>
            <div className={classes['nav-bar']}>
                <div className={classes['nav-logo']}>
                    <svg className={classes.svg}
                        viewBox="0 0 300 300"
                    >
                        <circle cx="150" cy="60" r="200" fill="red" stroke="blue" />
                    </svg>
                </div>
                <Dropdown multiSelect title="Add a Filter" items={supportedFilters()}/>
                <Dropdown title="Add a Shape"/>
                <Dropdown title="Add a Gradient"/>


            </div>
        </React.Fragment>
    );
};

export default TopNav;