import React from 'react';
import { Link } from 'react-router-dom'; 

const AddFriend = () => {
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
            <h1>Search a New Friend</h1>
            <input 
                type="text" 
                placeholder="Search for friends" 
                style={{ 
                    width: "300px",
                    marginBottom: "10px", 
                    padding: "8px", 
                    borderRadius: "5px", 
                    border: "1px solid #ccc" 
                }} 
            />
            <div style={{ width: "300px", display: "flex", justifyContent: "space-between" }}>
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
                    onClick={() => {
                        // searching friend action here
                    }}
                >
                    Submit
                </button>
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
        </div>
    );
};

export default AddFriend;
