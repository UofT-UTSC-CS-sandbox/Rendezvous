import React, { useState, useEffect, useRef } from 'react';
import BackendApi from './fastapi';
import { useNavigate } from 'react-router-dom';
import friends from './friend_data/friends';
import FriendList from './FriendList';
import './friends.css';

/* Friends Page. */
const Friends = () => {
  const [friendList, setFriendList] = useState(friends);
  // const [friendRequestList, setFriendRequestList] = useState(friendRequests);
  const navigate = useNavigate();
  const count = useRef(null);

  const getList = () => {
    BackendApi.post('/friends').then((response) => {
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
    navigate('/addfriend');
  };
  const handleSeeFriendRequestsSentClick = () => {
    navigate('/friendrequestssent');
  };
  const handleSeeFriendRequestsRecievedClick = () => {
    navigate('/friendrequestsrecieved');
  };

  return (
    <div>
      <div className='centerstyle'>
        <h1 className='Friends-list-header'>My Friends</h1>
        <div className='friend-buttons'style={{ marginBottom: '20px' }}>
          <button className='addFriendBtn' onClick={handleAddFriendClick}>
            <h3>+ Add Friend</h3>
          </button>
          <button className='friendRequestsBtn' onClick={handleSeeFriendRequestsRecievedClick}>
            <h3>Friend Requests Received</h3>
          </button>
          <button className='friendSentBtn' onClick={handleSeeFriendRequestsSentClick}>
            <h3>Friend Requests Sent</h3>
          </button>
        </div>
      </div>
      <FriendList friends={friendList} />
    </div>
  );
};

export default Friends;
