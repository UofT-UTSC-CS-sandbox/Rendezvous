import React, {useState, useEffect} from "react"; 
import "./CSS/profile.css"
import pfp from "./images/stickmanpfp.png";
import LeftSideBar from "../components/Sidebars/LeftSideBar";
import RightSideBar from "../components/Sidebars/RightSideBar";

const Profile = () => {
    const [bio, setBio] = useState(() => {
        return localStorage.getItem("bio") ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel ornare augue, vel gravida leo. Nam nec mi sit amet dui venenatis pulvinar.";});
    const handleEditBiography = () => {
        const newBio = prompt("Enter your new bio:");
        if (newBio !== null) {
            setBio(newBio);
            localStorage.setItem("bio", newBio);
        }
    };

    useEffect(() => {
        localStorage.setItem("bio", bio);
    }, [bio]);
    
    return (
        <>
            <div>
                <LeftSideBar />
                <RightSideBar />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1>Your Profile</h1>
                <img src={pfp} alt="Profile pic" className="resized-image"/>;
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginLeft: "25%",
                    marginRight: "25%",
                }}
            >
                <button className="button" onClick={handleEditBiography}>Edit Bio</button>
                <h2>{bio}</h2>
            </div>
        </>
    );
};

export default Profile;