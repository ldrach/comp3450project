import React from 'react';
import {useState, useEffect, createContext} from 'react';
import './NavBar.css';
import NavItem from './NavItem';
import Home from '../home/home';
import Trending from "../trending/trending"
import Friends from "../friends/friends"
import Profile from "../profile/profile"
import Login from "../login/login";
import Compare from "../compare/compare";
import OtherProfile from "../otherProfile/otherProfile";
import YourList from "../yourList/yourList";

//import axios from 'axios';




export const NavContext = createContext(undefined);

const navItems = [
    {id: 0, name:'Home', icon: ''},
    {id: 1, name:'Trending', icon: ''},
    {id: 2, name:'Friends', icon: ''},
    {id: 3, name:'Profile', icon: ''},
    {id: 4, name:'Logout', icon: ''}
];

const Navbar = () => {
    //const db = new LocalDB();
    const [activeItem, setNewActiveItem] = useState(null);
    const [notificationMessage, setNotification] = useState(null);
    const [currentUser, setUser] = useState(null);


    /*useEffect(() => {
        loadCurrentUser();
    }, []);*/

    /*async function loadCurrentUser() {
        const user = await db.loadUser(axiosInstance);
        if (user) {
            setUser(user);
            loadLastPage();
        } else {
            setNewActiveItem(navItems[3]);
        }
    }*/

    /*async function loadLastPage() {
        const lastPage = await db.loadLastPage();
        if (lastPage)
            setNewActiveItem(lastPage);
        else
            setNewActivePage(navItems[0]);
    }*/

    function setNewActivePage(item) {
        setNewActiveItem(item);
        //db.setLastPage(item);
    }

   /* function setNewCurrentUser(user) {
        setUser(user);
        db.saveLocalUser(user);
        loadLastPage();
    }*/


    const DisplayNavItems = () => {
        let width = 100/navItems.length;
        return navItems.map(item => {
            return (<NavItem item={item} width={width}
                             active={activeItem} key={item.id}/>);
        });
    };
    const DisplayCurrentPageSelection = () => {
        if (activeItem) {
            switch (activeItem.name) {
                case 'Home':
                    return (<Home />);
                case 'Trending':
                    return (<Trending />);
                case 'Friends':
                    return (<Friends />);
                case 'Profile':
                    return (<Profile />);
                case 'Logout':
                    return (<Login />);
            }
        }
        return (<div>Loading...</div>);
    };
    const handleSelectItem = (item) => {
        if (currentUser === null)
            return;

        if (item.id !== activeItem.id) {
            setNewActivePage(item);
        }
    };
    const showNotification = (message) => {
        setNotification(message);

        setTimeout(function() {
            setNotification(null);
        }, 3000);
    };

    const navContextObj = {
        notify: showNotification,
        handleClick: handleSelectItem,
        user: currentUser ? currentUser.user : null,
        isGlobalAdmin: currentUser ? currentUser.user.role === 'admin' : false,
        //setNewUser: setNewCurrentUser,
        //axiosInstance: axiosInstance,
        //db: db
    };

/*    return (
        <NavContext.Provider value={ navContextObj }>
            <div className="master-page-container">
                {notificationMessage && <Notification message={notificationMessage}/>}
                <div className="current-page-container">
                    <DisplayCurrentPageSelection />
                </div>
                <div className="navigation-container">
                    {currentUser && <DisplayNavItems />}
                </div>
            </div>
        </NavContext.Provider>
    );*/
};

export default Navbar;