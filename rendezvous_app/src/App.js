//import logo from './logo.svg';
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./Pages";
import About from "./Pages/about";
import Events from "./Pages/events";
import Friends from "./Pages/friends";
import AddFriend from "./Pages/addfriend";
import SignUp from "./Pages/signup";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/events"
                    element={<Events />}
                />
                <Route path="/friends" 
                       element={<Friends />} />
                <Route path="/addfriend" 
                       element={<AddFriend />} />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                />
            </Routes>
        </Router>
    );
}

export default App;
