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
import Friends from "./Pages/friends";
import AddFriends from "./Pages/addfriend";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Profile from "./Pages/profile";

import EventsPage from "./Pages/EventsPage";

import EventSignup from "./Pages/EventSignup";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider, useAuth } from "./AuthContext";

const App = () => {
    const { isAuthenticated } = useAuth();
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    
                    { isAuthenticated ? (
                        <>
                            <Route path="/EventsPage" element={<EventsPage />}/>
                            <Route path="/friends" element={<Friends />} />
                            <Route path="/profile" element={<Profile />} />
                        </>
                    ) : (
                        // <Route element={<PrivateRoute/>}>
                        //     <Route path="/EventsPage" element={<EventsPage />}/>
                        //     <Route path="/friends" element={<Friends />} />
                        //     <Route path="/profile" element={<Profile />} />
                        // </Route>
                        <Route
                            path="/login"
                            element={<Login />}
                        />
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
                    <Route path="/addfriend" element={<AddFriends />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
