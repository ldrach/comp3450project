import React, {useContext} from 'react';
import './NavBar.css';
import '../App.css';
import {NavContext} from "./NavBar";

const NavItem = ({item, active, width}) => {
    const navigationContext = useContext(NavContext);
    return (
        <p style={{width: `${width}%`}} className={!!active && active.id === item.id? 'active':''}
           onClick={() => navigationContext.handleClick(item)}>
            <i className={item.icon}></i> <span className="mobile-hidden">{item.name}</span>
        </p>
    );
};

export default NavItem;