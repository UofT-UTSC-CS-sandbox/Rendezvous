//import logo from './logo.svg';
import "./style.css";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./Pages/home";
import About from "./Pages/about";
import Events from "./Pages/EventsList";
import Friends from "./Pages/friends";
import AddFriends from "./Pages/addfriend";
import FriendRequestsRecieved from "./Pages/friendrequestsrecieved";
import FriendRequestsSent from "./Pages/friendrequestssent";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Profile from "./Pages/profile";
import EventDetails from './Pages/event-details'

import HostEvent from "./Pages/HostEvent";

import EventSignup from "./Pages/EventSignup";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "./AuthContext";

const App = () => {
    const { isAuthenticated } = useAuth();
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                
                { isAuthenticated ? (
                    <>
                        <Route path="/HostEvent" element={<HostEvent />}/>
                        <Route path="/friends" element={<Friends />} />
                        <Route path="/profile" element={<Profile />} />
                    </>
                ) : (
                    <Route element={<PrivateRoute/>}>
                        <Route path="/HostEvent" element={<HostEvent />}/>
                        <Route path="/friends" element={<Friends />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                )}
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route path="/event-signup/:id" element={<EventSignup />} />
                <Route path="/HostEvent" element = {<HostEvent />}/>
                <Route path="/addfriend" element={<AddFriends />} />
                <Route path="/friendrequestsrecieved" element={<FriendRequestsRecieved />} />
                <Route path="/friendrequestssent" element={<FriendRequestsSent />} />
                <Route path="/event-details" element={<EventDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
