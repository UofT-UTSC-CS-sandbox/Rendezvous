import React, { useState } from "react";

const Friends = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const friendbtn = {
        margin: "10px",
        padding: "10px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    };

    const toggleSidebarVisibility = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
            }}
        >
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1>Friends List</h1> <br></br>
                <div>
                <button onClick={toggleSidebarVisibility} style={{ margin: "20px" }}>
                    {sidebarVisible ? "Hide my Friend List" : "Show my Friend List"}
                </button>
                </div>
            </div>
            {sidebarVisible && (
                <div
                    style={{
                        width: "200px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "10px",
                    }}
                >
                <div style={{ marginBottom: "20px", textAlign: "center" }}>
                    <img
                        src="https://www.w3schools.com/w3images/avatar2.png" 
                        alt="Avatar"
                        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                    />
                    <p style={{ margin: "5px 0", fontSize: "16px", color:"#000" }}>User Name</p>
                    </div>
                    <button style={friendbtn}>Friend 1</button>
                    <button style={friendbtn}>Friend 2</button>
                    <button style={friendbtn}>Friend 3</button>
                    <button style={friendbtn}>Friend 4</button>
                    <button style={friendbtn}>Friend 5</button>
                </div>
            )}
        </div>
    );
};

export default Friends;
