import React from 'react';
import Friend from './Friend';

/* Friend List storing all friends in friends. 
    friends should be a json array with the params
    in Friend. */
function FriendList({ friends }) {
    return (
        <div className="friends-list">
            {friends.map((friend, index) => (
                <Friend
                key = {index}
                {...friend}
                />
             ))
            }    
        </div>
    );
};



export default FriendList;