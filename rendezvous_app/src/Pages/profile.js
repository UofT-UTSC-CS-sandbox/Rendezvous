import React, { useState, useEffect, useRef } from "react";

import { Helmet } from 'react-helmet'
import pfp from "./images/stickmanpfp.png";
import './profile.css'

const Profile = (props) => {
    // Bio handler
    const [bio, setBio] = useState(() => {
      return localStorage.getItem("bio") ||
          "I love to code a visit different places around Canada. I play video games like League of Legends and Fallout.";
  });

  const [fullName, setFullName] = useState("Kenneth");

  const handleSaveBioChanges = () => {
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("bio", bio);
      setShowBioModal(false);
  };

  // Profile picture handler
  const [profilePic, setProfilePic] = useState(() => {
      return localStorage.getItem("profilePic") || pfp;
  });

  // Profile info handler
  const [role, setRole] = useState("Computer Science 3rd Year");
  const [website, setWebsite] = useState("https://test.com");
  const [github, setGithub] = useState("test");
  const [twitter, setTwitter] = useState("@test");
  const [instagram, setInstagram] = useState("test");
  const [facebook, setFacebook] = useState("test");

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);

  const handleProfilePicChange = (e) => {
      const imageFile = e.target.files[0];
      if (imageFile) {
          const reader = new FileReader();
          reader.onload = () => {
              const imageDataUrl = reader.result;
              setProfilePic(imageDataUrl);
              localStorage.setItem("profilePic", imageDataUrl);
          };
          reader.readAsDataURL(imageFile);
      }
  };

  const handleSaveProfileChanges = () => {
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("role", role);
      localStorage.setItem("website", website);
      localStorage.setItem("github", github);
      localStorage.setItem("twitter", twitter);
      localStorage.setItem("instagram", instagram);
      localStorage.setItem("facebook", facebook);
      setShowProfileModal(false);
  };

  useEffect(() => {
      const savedFullName = localStorage.getItem("fullName");
      if (savedFullName) {
          setFullName(savedFullName);
      }
      const savedRole = localStorage.getItem("role");
      if (savedRole) {
          setRole(savedRole);
      }
      const savedWebsite = localStorage.getItem("website");
      if (savedWebsite) {
          setWebsite(savedWebsite);
      }
      const savedGithub = localStorage.getItem("github");
      if (savedGithub) {
          setGithub(savedGithub);
      }
      const savedTwitter = localStorage.getItem("twitter");
      if (savedTwitter) {
          setTwitter(savedTwitter);
      }
      const savedInstagram = localStorage.getItem("instagram");
      if (savedInstagram) {
          setInstagram(savedInstagram);
      }
      const savedFacebook = localStorage.getItem("facebook");
      if (savedFacebook) {
          setFacebook(savedFacebook);
      }
  }, []);
  return (
    <div className="profile-container">
      <Helmet>
        <title>Profile - Rendezvous</title>
        <meta property="og:title" content="Profile - Rendezvous" />
      </Helmet>
      <div className="profile-container01">
        <div className="profile-left-container">
          <div className="profile-card">
            <img
              alt="image"
              src={profilePic}
              className="profile-pic"
            />
            <div className="profile-username">
              <span className="username">Cool Username</span>
              <span className="course">{role}</span>
              <span className="year">3rd year</span>
            </div>
            <button type="button" className="edit-profile-btn" onClick={() => setShowProfileModal(true)}>
              Edit Profile
            </button>
          </div>
          <div className="social-links">
            <div className="profile-website">
              <span className="website">Website</span>
              <span className="wlink"><a href={website}>{website}</a></span>
            </div>
            <div className="profile-github">
              <span className="github">Github</span>
              <span className="glink">{github}</span>
            </div>
            <div className="profile-twitter">
              <span className="twitter">Twitter</span>
              <span className="tlink">{twitter}</span>
            </div>
            <div className="profile-instagram">
              <span className="instagram">Instagram</span>
              <span className="ilink">{instagram}</span>
            </div>
            <div className="profile-facebook">
              <span className="facebook">Facebook</span>
              <span className="flink">{facebook}</span>
            </div>
          </div>
        </div>
        <div className="profile-right-container">
          <div className="profile-namebio">
            <div className="profile-name">
              <span className="name">Name</span>
              <span className="namelink">{fullName}</span>
            </div>
            <div className="profile-bio">
              <span className="bio">Bio</span>
              <span className="biolink">{bio}</span>
            </div>
          </div>
          <div className="profile-all-events-container">
            <div className="profile-attended">
              <span className="events-attended">Events Attended</span>
            </div>
            <div className="profile-hosted">
              <span className="events-hosted">
                <span>Events Hosted</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {showProfileModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Profile</h2>
                        <div className="form-group">
                            <label htmlFor="profile-pic">Profile Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <input
                                type="text"
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="about-me">About Me</label>
                            <textarea
                                id="about-me"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <input
                                type="text"
                                id="website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="github">Github</label>
                            <input
                                type="text"
                                id="github"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="twitter">Twitter</label>
                            <input
                                type="text"
                                id="twitter"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="instagram">Instagram</label>
                            <input
                                type="text"
                                id="instagram"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="facebook">Facebook</label>
                            <input
                                type="text"
                                id="facebook"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </div>
                        <button className="save-changes-btn" onClick={handleSaveProfileChanges}>Save Changes</button>
                        <button className="close-modal-btn" onClick={() => setShowProfileModal(false)}>Close</button>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Profile
