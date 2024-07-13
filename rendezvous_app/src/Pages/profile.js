import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet'
import BackendApi from "./fastapi";
import './profile.css'
import pfpplaceholder from './images/stickmanpfp.png';
import RecentHostedEvents from "../components/RecentEvents/recenthostedevents";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    id: -1,
    username: '',
    title: '',
    bio: '',
    github: '',
    twitter: '',
    instagram: '',
    pfp: null,
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
 
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

  const handleSaveProfileChanges = async () => {
    try {
      await BackendApi.put("/profile", profileData);
      setShowProfileModal(false);
    } catch (error) {
      console.error("Error saving profile changes:", error);
    }
  };

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
              <span className="events-attended">Events Attended</span>
            </div>
            <div className="profile-hosted">
              <span className="events-hosted">
                <span>Events Hosted</span>
                <div>
                  <RecentHostedEvents accountId={profileData.id} />
                </div>
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
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={profileData.title}
                                onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="about-me">About Me</label>
                            <textarea
                                id="about-me"
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="github">Github</label>
                            <input
                                type="text"
                                id="github"
                                value={profileData.github}
                                onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="twitter">Twitter</label>
                            <input
                                type="text"
                                id="twitter"
                                value={profileData.twitter}
                                onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="instagram">Instagram</label>
                            <input
                                type="text"
                                id="instagram"
                                value={profileData.instagram}
                                onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
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
