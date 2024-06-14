import React, { useState, useEffect, useRef } from "react";
import "./CSS/profile.css";
import pfp from "./images/stickmanpfp.png";
import LeftSideBar from "../components/Sidebars/LeftSideBar";
import RightSideBar from "../components/Sidebars/RightSideBar";

const Profile = () => {
    // Bio handler
    const [bio, setBio] = useState(() => {
        return localStorage.getItem("bio") ||
            "I love to code and I am passionate about board games. I usually meet with my friends to visit different places around Canada. I play video games like League of Legends and Fallout.";
    });

    const handleEditBio = () => {
        const newBio = prompt("Enter your new bio:");
        if (newBio !== null) {
            setBio(newBio);
            localStorage.setItem("bio", newBio);
        }
    };

    // Profile picture handler
    const [profilePic, setProfilePic] = useState(() => {
        return localStorage.getItem("profilePic") || pfp;
    });
    const [fileInputDisabled, setFileInputDisabled] = useState(false);
    const imageFileInputRef = useRef(null);

    const handleProfilePicChange = () => {
        setFileInputDisabled(true);
        imageFileInputRef.current.click();
    };

    const handleFileInputChange = () => {
        const imageFile = imageFileInputRef.current.files[0];
        if (imageFile) {
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

    useEffect(() => {
        localStorage.setItem("bio", bio);
    }, [bio]);

    useEffect(() => {
        localStorage.setItem("profilePic", profilePic);
    }, [profilePic]);

    return (
        <>
            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="profile-card">
                        <img src={profilePic} alt="Profile" className="profile-pic" />
                        <h2>John Doe</h2>
                        <p>Computer Science<br />3rd Year</p>
                        <button className="edit-profile-btn" onClick={handleProfilePicChange} disabled={fileInputDisabled}>Edit Profile</button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={imageFileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileInputChange}
                        />
                    </div>
                    <div className="social-links">
                        <p><strong>Website</strong>: <a href="https://test.com">https://test.com</a></p>
                        <p><strong>Github</strong>: test</p>
                        <p><strong>Twitter</strong>: @test</p>
                        <p><strong>Instagram</strong>: test</p>
                        <p><strong>Facebook</strong>: test</p>
                    </div>
                </div>
                <div className="profile-main">
                    <div className="profile-details">
                        <h3>Full Name</h3>
                        <p>Kenneth Valdez</p>
                        <h3>About Me</h3>
                        <p>{bio}</p>
                        <button className="edit-bio-btn" onClick={handleEditBio}>Edit Bio</button>
                    </div>
                    <div className="events-section">
                        <div className="event-card">
                            <h4>Events Attended</h4>
                        </div>
                        <div className="event-card">
                            <h4>Events Hosted</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
