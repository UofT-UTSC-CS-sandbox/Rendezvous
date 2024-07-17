import React, { useState, useEffect, useRef } from 'react';
import BackendApi from './fastapi';
import { useNavigate } from 'react-router-dom';
import friends from './friend_data/friends';
import FriendList from './FriendList';
import './friends.css';

/* Friends Page. */
const Friends = () => {
  const [friendList, setFriendList] = useState(friends);
  const navigate = useNavigate();
  const count = useRef(null);

  /* Database Query on Initial Render
        Friends currently DOES NOT update when another user adds
        the current user as a friend */
  useEffect(() => {
    if (count.current == null) {
      BackendApi.post('/friends').then((response) => {
        setFriendList(response.data);
      });
    }
    return () => {
      count.current = 1;
    };
  }, []);

  const handleAddFriendClick = () => {
    navigate('/addfriend');
  };

  return (
    <div>
      <div className='centerstyle'>
        <h1 className='Friends-list-header'>My Friends</h1>
        <div style={{ marginBottom: '20px' }}>
          <button className='addFriendBtn' onClick={handleAddFriendClick}>
            <h3>+ Add Friend</h3>
          </button>
        </div>
      </div>
      <FriendList friends={friendList} />
    </div>
  );
};

export default Friends;
