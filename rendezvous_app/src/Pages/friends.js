import React, { useState, useEffect, useRef} from 'react';
import BackendApi from './fastapi';
import { useNavigate } from 'react-router-dom';
import friends from './friend_data/friends'
import FriendList from './FriendList'


/* Friends Page. */
const Friends = () => {
    const [friendList, setFriendList] = useState(friends);
    const navigate = useNavigate();
    const count = useRef(null);

    /* Database Query on Initial Render
        Friends currently DOES NOT update when another user adds
        the current user as a friend */
    useEffect(() => {
        if(count.current == null){
            BackendApi.post('/friends').then((response) => {setFriendList(response.data);});
        }
        return () => {count.current = 1; }
    }, []);
    

    const addFriendBtn = {
        margin: "20px 0",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    };

    const handleAddFriendClick = () => {
        navigate('/addfriend');
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
                flexDirection: "column",
            }}
        >
            <h1>Friends List</h1>

            <div style={{ marginBottom: "20px" }}>
                <button style={addFriendBtn} onClick={handleAddFriendClick}>
                    <h3>+ Add Friend</h3>
                </button>
            </div>
            <FriendList friends={friendList} />
        </div>

    );
};

export default Friends;
