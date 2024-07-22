import React, { useState, useEffect, useRef } from 'react';
import BackendApi from './fastapi';
import { useNavigate } from 'react-router-dom';
import friends from './friend_data/friends';
import FriendRequestsRecievedList from './FriendRequestsRecievedList';
import './friends.css';

const FriendRequestsRecieved = () => {
  const [friendRequestsRecieved, setFriendList] = useState(friends);
  // const [friendRequestList, setFriendRequestList] = useState(friendRequests);
  const navigate = useNavigate();
  const count = useRef(null);


  const getList = () => {
    BackendApi.post('/friendrequestsrecieved').then((response) => {
      setFriendList(response.data);
    });
  };
  /* Database Query on Initial Render
        Friends currently DOES NOT update when another user adds
        the current user as a friend */
  useEffect(() => {
    getList();
    const interval = setInterval(getList, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBackClick = () => {
    navigate('/friends');
  };

  return (
    <div>
      <div className='centerstyle'>
        <h1 className='Friends-list-header'>Friend Requests Recieved</h1>
        <div style={{ marginBottom: '20px' }}>
          <button className='addFriendBtn' onClick={handleBackClick}>
            <h3>Back</h3>
          </button>
        </div>
      </div>
      <FriendRequestsRecievedList friends={friendRequestsRecieved} />
    </div>
  );
};

export default FriendRequestsRecieved;
