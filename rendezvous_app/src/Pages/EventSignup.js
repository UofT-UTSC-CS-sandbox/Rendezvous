import React, {useState} from 'react';


const [eventID, setEventID] = useState('');
const [userID, setUserID] = useState('');



const EventSignup = () => 

{
return (
<div class="EventSign">
    <h3 align= "center">Welcome to event signup page</h3>
    <form action='' onSubmit={handleSubmit}>
        <ul>
            <button type="submit" >Sign Up</button>
            
        </ul>
    </form>

</div>

);
};

export default EventSignup;
