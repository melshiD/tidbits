import React from "react";
import TopNav from './TopNav';

const Layout = ({children}) => {
    return(
        <React.Fragment>
            <div>
                <TopNav/>
            </div>
            <main>
                {children}
            </main>
        </React.Fragment>

    );
};

export default Layout;

