import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackendApi from './fastapi';
import { useNavigate } from 'react-router-dom';

const AddFriend = () => {
    const [friendUserName, setFriendUsername] = useState({username: ''});
    const navigate = useNavigate();
    const [resultMessage, setResultMessage] = useState('');
    const [resultStatus, setResultStatus] = useState('')

    /* Saves change in typed friend username. */
    const handleUsernameChange = (usernameForm) => {
        setFriendUsername({ ...friendUserName,
            [usernameForm.target.name]: usernameForm.target.value });
    };

    /* Handles the username form being submitted.
        Sends a post request to the server.
        If the user with username (friendUserName.username) exists,
        and was succesfully added to the current user's friend list,
        this call returns to the /friends page.
        
        Otherwise, an error message is printed. */
    const handleSubmitUsername = async (usernameForm) => {
        usernameForm.preventDefault();
        try {
            const response = await BackendApi.post('/sendfriendrequest', friendUserName);
            setResultMessage('Friend added!');
            console.log(resultStatus)

            /* Waits for 5 seconds, to let user read the success message.
                Then goes to friends page.*/
            setTimeout(function(){navigate('/friends')}, 1500);
        } catch (error) {
            setResultStatus('1')
            console.log(resultStatus)
            setResultMessage(error.response.data.detail);
        }
    };

    /* Return is of the form:

    Search a New Friend
    <resultMessage>
    [currently typed username] (Add Friend)
    (Cancel)
    
    */
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
            <h1>Search a New Friend</h1>
            {resultMessage && <p style={{color: (resultStatus == '0')?'green':'red'}}>{resultMessage}</p>}

            <form onSubmit={handleSubmitUsername}>
                <input 
                    type="text"
                    name="username"
                    placeholder="Search for friends..."
                    value={friendUserName.username}
                    onChange={handleUsernameChange}
                    style={{ 
                        width: "300px",
                        marginBottom: "10px", 
                        padding: "8px", 
                        borderRadius: "5px", 
                        border: "1px solid #ccc" 
                    }} 
                />
                <button 
                    type="submit"
                    style = 
                        {{ 
                            padding: "10px", 
                            backgroundColor: "#f0f0f0", 
                            color: "#333", 
                            border: "none", 
                            borderRadius: "5px", 
                            cursor: "pointer",
                            width: "100px" 
                        }}
                >
                    Add Friend
                </button>
            </form>

            <Link to="/friends" style={{ textDecoration: 'none' }}>
                <button 
                    style={{ 
                        padding: "10px", 
                        backgroundColor: "#f0f0f0", 
                        color: "#333", 
                        border: "none", 
                        borderRadius: "5px", 
                        cursor: "pointer",
                        width: "100px" 
                    }}
                >
                    Cancel
                </button>
        </Link>
    </div>
    );
};

export default AddFriend;
