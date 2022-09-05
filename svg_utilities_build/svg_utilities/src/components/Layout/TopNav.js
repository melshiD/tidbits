import React from 'react';
import classes from './TopNav.module.css';


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
                <div className={classes['dropdown']} data-dropdown>
                    <button className={classes['link']} data-dropdown-button onClick={dropdownButtonHandler}>
                        Add Filter
                    </button>
                    <div className={classes["dropdown-menu, information-grid"]}>
                        <div>
                            <div className={classes["dropdown-heading"]}>Add Filter</div>
                            <div className={classes["dropdown-links"]}>
                                <a href="">feTurbulence</a>
                                <a href="">feTurbulence</a>
                                <a href="">feTurbulence</a>
                            </div>
                        </div>
                    </div>

                    <button className={classes['nav-button']}>
                        Add Primitive
                    </button>
                    <button className={classes['nav-button']}>
                        Add Element
                    </button>
                </div>

            </div>
        </React.Fragment>
    );
};

export default TopNav;