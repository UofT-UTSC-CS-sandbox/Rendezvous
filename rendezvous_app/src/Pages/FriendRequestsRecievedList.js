import React from 'react';
import BackendApi from './fastapi';
import './FriendList.css';

/** 
@typedef {Object} FriendProps
@property {string} username - The username of the friend.
@property {string} profile_image_src - The URL of the event image.
*/


/* Individual Friend Object
    Currently includes username and a sample image url. */
/**@param {FriendProps} props */


/* Friend List storing all friends in friends. 
    friends should be a json array with the params
    in Friend. */


function FriendRequestsRecievedList({ friends }) {
    const onAcceptRequestClick = async (username) => {
        await BackendApi.post('/addfriend', {username: username});
    };
    const onDenyRequestClick = async (username) => {
        await BackendApi.post('/denyfriendrequest', {username: username});
    };
    return (
        <div className="friends-list-container">
            <div className='friends-padding'>
            <div className="friends-container">
                {friends.map((friend, index) => (
                    <div className="friend-card" key={index}>
                        <img src={friend.profile_image_src} alt={friend.name} />
                        <div className="friend-name">{friend.username}</div>
                        <div className="friend-buttons">
                        <button className='button'onClick={() => onAcceptRequestClick(friend.username)}>
                            Accept
                        </button>
                        <button className='button' onClick={() => onDenyRequestClick(friend.username)}>
                            Deny
                        </button>
                        </div>
                    </div>
                ))
                }
            </div>
            </div>
        </div>
    );
};



export default FriendRequestsRecievedList;