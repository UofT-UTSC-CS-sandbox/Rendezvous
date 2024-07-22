import React, { useState, useEffect, useRef } from 'react';
import BackendApi from './fastapi';
import { useNavigate } from 'react-router-dom';
import friends from './friend_data/friends';
import FriendRequestsSentList from './FriendRequestsSentList';
import './friends.css';

const FriendRequestsSent = () => {
  const [friendRequestsSent, setFriendList] = useState(friends);
  // const [friendRequestList, setFriendRequestList] = useState(friendRequests);
  const navigate = useNavigate();
  const count = useRef(null);


  const getList = () => {
    BackendApi.post('/friendrequestssent').then((response) => {
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

  const handleAddFriendClick = () => {
    navigate('/friends');
  };

  return (
    <div>
      <div className='centerstyle'>
        <h1 className='Friends-list-header'>Friend Requests Sent</h1>
        <div style={{ marginBottom: '20px' }}>
          <button className='addFriendBtn' onClick={handleAddFriendClick}>
            <h3>Back</h3>
          </button>
        </div>
      </div>
      <FriendRequestsSentList friends={friendRequestsSent} />
    </div>
  );
};

export default FriendRequestsSent;
