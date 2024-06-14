import React, {useState, useEffect, useRef} from "react"; 
import "./CSS/profile.css"
import pfp from "./images/stickmanpfp.png";
import LeftSideBar from "../components/Sidebars/LeftSideBar";
import RightSideBar from "../components/Sidebars/RightSideBar";

const Profile = () => {
    //bio handler
    const [bio, setBio] = useState(() => {
        return localStorage.getItem("bio") ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel ornare augue, vel gravida leo. Nam nec mi sit amet dui venenatis pulvinar.";});
    const handleEditBio = () => {
        const newBio = prompt("Enter your new bio:");
        if (newBio !== null) {
            setBio(newBio);
            localStorage.setItem("bio", newBio);
        }
    };
    
    //profile picture handler
    const [profilePic, setProfilePic] = useState(() => {
        return localStorage.getItem("profilePic") || pfp;
    });
    const [fileInputDisabled, setFileInputDisabled] = useState(false);
    const imageFileInputRef = useRef(null);
    const handleProfilePicChange = () => {
        setFileInputDisabled(true);
        imageFileInputRef.current.click();
    }
    //for some reason the button won't work unless I do these 2 functions
    const handleFileInputChange = () => {
        const imageFile = imageFileInputRef.current.files[0];
        if (imageFile){
            const reader = new FileReader();
            reader.onload = () => {
                const imageDataUrl = reader.result;
                setProfilePic(imageDataUrl);
                localStorage.setItem("profilePic", imageDataUrl);
                setFileInputDisabled(false);
            };
            reader.readAsDataURL(imageFile);
        }
    };
    // const handleProfilePicChange = () => {
    //     const imageFile = imageFileInputRef.current.files[0];
    //     if (imageFile){
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             const imageDataUrl = reader.result;
    //             setProfilePic(imageDataUrl);
    //             localStorage.setItem("profilePic", imageDataUrl);
    //         };
    //         reader.readAsDataURL(imageFile);
    //     }
    // };

    useEffect(() => {
        localStorage.setItem("bio", bio);
    }, [bio]);
    
    useEffect(() => {
        localStorage.setItem("profilePic", profilePic);
    }, [profilePic]);

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
                <img src={profilePic} alt="Profile pic" className="resized-image"/>
                <input
                    type="file"
                    accept="image/*"
                    ref={imageFileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                />
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
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button className="button" onClick={handleProfilePicChange} disabled={fileInputDisabled}>Change Profile Pic</button>
                    <button className="button" onClick={handleEditBio}>Edit Bio</button>
                </div>

                <h2>{bio}</h2>
            </div>
        </>
    );
};

export default Profile;