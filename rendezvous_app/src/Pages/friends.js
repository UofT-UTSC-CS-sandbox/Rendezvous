import React from 'react';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
    const navigate = useNavigate();

    const friendbtn = {
        margin: "10px 0",
        padding: "10px",
        backgroundColor: "#fff",
        color: "#000",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        width: "200px",
        justifyContent: "flex-start",
    };

    const avatarStyle = {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        marginRight: "10px",
    };

    const addFriendBtn = {
        margin: "20px 0",
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
                height: "100vh",
                flexDirection: "column",
            }}
        >
            <h1>Friends List</h1>
            <div style={{ marginBottom: "20px" }}>
                <img
                    src="https://www.w3schools.com/w3images/avatar2.png"
                    alt="Avatar"
                    style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                />
                <p style={{ margin: "5px 0", fontSize: "16px", color: "black" }}>UserName</p>
                <button style={addFriendBtn} onClick={handleAddFriendClick}>
                    <h3>+ Add Friend</h3>
                </button>
            </div>
            <button style={friendbtn}>
                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" style={avatarStyle} />
                <h2>Friend 1</h2>
            </button>
            <button style={friendbtn}>
                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" style={avatarStyle} />
                <h2>Friend 2</h2>
            </button>
            <button style={friendbtn}>
                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" style={avatarStyle} />
                <h2>Friend 3</h2>
            </button>
            <button style={friendbtn}>
                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" style={avatarStyle} />
                <h2>Friend 4</h2>
            </button>
            <button style={friendbtn}>
                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" style={avatarStyle} />
                <h2>Friend 5</h2>
            </button>
        </div>
    );
};

export default Friends;
