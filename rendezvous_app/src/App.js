//import logo from './logo.svg';
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
import Login from "./Pages/login";
import Register from "./Pages/register";
import Profile from "./Pages/profile";
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
                        <Route path="/events" element={<Events />}/>
                        <Route path="/friends" element={<Friends />} />
                        <Route path="/profile" element={<Profile />} />
                    </>
                ) : (
                    <Route element={<PrivateRoute/>}>
                        <Route path="/events" element={<Events />}/>
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
            </Routes>
        </Router>
    );
};

export default App;
