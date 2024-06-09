import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                <NavLink to="/home">
                        Home
                    </NavLink>
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
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">
                        Log In
                    </NavBtnLink>
                </NavBtn>
                <NavBtn>
                    <NavBtnLink to="/register">
                        Register
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;