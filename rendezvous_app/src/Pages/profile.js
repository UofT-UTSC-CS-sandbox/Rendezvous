import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet'
import BackendApi from "./fastapi";
import './profile.css'
import pfpplaceholder from './images/stickmanpfp.png';
import RecentHostedEvents from "../components/RecentEvents/recenthostedevents";
import RecentAttendedEvents from "../components/RecentEvents/recentattendedevents";
import EventPopup from "../components/RecentEvents/eventpopup";
import AttendedEventPopup from "../components/RecentEvents/attendedeventpopup";

const Profile = () => {
  // useState for default profile data
  const [profileData, setProfileData] = useState({
    id: null,
    username: '',
    title: '',
    bio: '',
    github: '',
    twitter: '',
    instagram: '',
    pfp: null,
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAttendedPopupOpen, setIsAttendedPopupOpen] = useState(false);

  //functions for handling opening/closing the pop-up for all hosted events
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // useEffect to retrieve the user's profile data from database
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await BackendApi.get("/profile");
      const userData = response.data;
      setProfileData({
        id: userData.id,
        username: userData.username,
        title: userData.title || 'No Title Yet',
        bio: userData.bio || 'No Bio Yet',
        github: userData.github || 'No Github',
        twitter: userData.twitter || 'No Twitter',
        instagram: userData.instagram || 'No Instagram',
        pfp: userData.pfp || pfpplaceholder, 
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  //function for handling saving profile changes, like changing a bio
  const handleSaveProfileChanges = async () => {
    try {
      await BackendApi.put("/profile", profileData);
      setShowProfileModal(false);
    } catch (error) {
      console.error("Error saving profile changes:", error);
    }
  };

  //function for handling switching profile pictures, more complicated because it requires going into a user's file storage
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, pfp: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  //the displayed component's code is here
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
              src={profileData.pfp}
              className="profile-pic"
            />
            <div className="profile-username">
              <span className="username">{profileData.username}</span>
              <span className="title">{profileData.title}</span>
            </div>
            <button type="button" className="edit-profile-btn" onClick={() => setShowProfileModal(true)}>
              Edit Profile
            </button>
          </div>
          <div className="social-links">
            <div className="profile-github">
              <span className="github">Github</span>
              <span className="glink">{profileData.github}</span>
            </div>
            <div className="profile-twitter">
              <span className="twitter">Twitter</span>
              <span className="tlink">{profileData.twitter}</span>
            </div>
            <div className="profile-instagram">
              <span className="instagram">Instagram</span>
              <span className="ilink">{profileData.instagram}</span>
            </div>
          </div>
        </div>
        <div className="profile-right-container">
          <div className="profile-namebio">
            <div className="profile-bio">
              <span className="bio">Bio</span>
              <span className="biolink">{profileData.bio}</span>
            </div>
          </div>
          <div className="profile-all-events-container">
            <div className="profile-attended">
              <span className="events-attended">
                <span>Events Attended</span>
                <button className="view-events-btn" onClick={() => setIsAttendedPopupOpen(true)}>
                  All Attended Events
                </button>
                {profileData.id && (
                  <div>
                    <RecentAttendedEvents accountId={profileData.id} />
                  </div>
                )}
                </span>
            </div>
            <div className="profile-hosted">
              <span className="events-hosted">
                <span>Events Hosted</span>
                <button className="view-events-btn" onClick={handleOpenPopup}>
                  All Hosted Events
                </button>
                {profileData.id && (
                  <div>
                    <RecentHostedEvents accountId={profileData.id} />
                  </div>
                )}
              </span>
              {/* The all hosted events pop-up section is here */}
            </div>
            <EventPopup
              isOpen={isPopupOpen}
              onClose={handleClosePopup}
              accountId={profileData.id}
            />
            {/* Popup for attended events */}
            <AttendedEventPopup
              isOpen={isAttendedPopupOpen}
              onClose={() => setIsAttendedPopupOpen(false)}
              accountId={profileData.id}
            />
          </div>
        </div>
      </div>

      {/* This section is the pop up for editing the profile page */}
      {showProfileModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2 className="thq-heading-3" >Edit Profile</h2>
                        <div className="form-group">
                            <label className="inside-text" htmlFor="profile-pic">Profile Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="inside-text" htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={profileData.title}
                                onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="inside-text" htmlFor="about-me">About Me</label>
                            <textarea
                                id="about-me"
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="inside-text" htmlFor="github">Github</label>
                            <input
                                type="text"
                                id="github"
                                value={profileData.github}
                                onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="inside-text" htmlFor="twitter">Twitter</label>
                            <input
                                type="text"
                                id="twitter"
                                value={profileData.twitter}
                                onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="inside-text" htmlFor="instagram">Instagram</label>
                            <input
                                type="text"
                                id="instagram"
                                value={profileData.instagram}
                                onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                            />
                        </div>
                        <div className="button-container-popup">
                        <button className="save-changes-btn" onClick={handleSaveProfileChanges}>Save Changes</button>
                        <button className="close-modal-btn" onClick={() => setShowProfileModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Profile
