import React from 'react';

const EventSignup = () => 

{
return (
<div class="EventSign">
    <h3 align= "center">Welcome to event signup page</h3>
    <form action='/EventSignup' method="post">
        <ul>
            <li>
            <label for= "Name">Name:</label> 
            <input type= "text" id="fname" name="fname" />
            <label for= "StudentID">StudentID:</label>
            <input type = "text" id="fStudentID" name="fStudentID" />
            <button type="button" >Sign Up</button>
            </li>
        </ul>
    </form>

</div>

);
};

export default EventSignup;
