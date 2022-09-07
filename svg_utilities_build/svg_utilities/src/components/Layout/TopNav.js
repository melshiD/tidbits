import React, {useContext} from 'react';
import classes from './TopNav.module.css';
import Dropdown from './Dropdown';
import supportedFilters from '../Filter-components/supportedFilters';
import FilterContext from '../../Store/filter-context';


const TopNav = () => {
    let hfCtx = useContext(FilterContext);
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
                <Dropdown title="Add a Filter" items={supportedFilters()}/>
                <Dropdown title="Add a Shape" displayFilterForm hoveringFilterToken={hfCtx.hoveringFilterToken}/>
                <Dropdown title="Add a Gradient"/>
        {/* WYSBD: BUILD PURPOSE-MADE DROPDOWN COMPONENTS THAT EXTEND THESE DROPDOWN COMPONENTS  */}

            </div>
        </React.Fragment>
    );
};

export default TopNav;