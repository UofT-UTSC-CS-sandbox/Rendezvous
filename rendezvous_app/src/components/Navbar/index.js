import React, { useState, useContext } from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";
import { AuthContext } from '../../AuthContext';


const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/events" activeStyle>
                        Events
                    </NavLink>
                    <NavLink to="/friends" activeStyle>
                        Friends
                    </NavLink>
                    <NavLink to="/profile" activeStyle>
                        Profile
                    </NavLink>
                </NavMenu>
                {isAuthenticated ? (
                    <NavBtn>
                        <NavBtnLink onClick={handleLogout}>Logout</NavBtnLink>
                    </NavBtn>
                ) : (
                    <>
                        <NavBtn>
                            <NavBtnLink to="/login">Log In</NavBtnLink>
                        </NavBtn>
                        <NavBtn>
                            <NavBtnLink to="/register">Register</NavBtnLink>
                        </NavBtn>
                    </>
                )}
            </Nav>
        </>
    );
};

export default Navbar;
