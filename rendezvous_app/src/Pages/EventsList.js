import React from 'react';
import Event from './Event';

const events = [
{
    title: "Social Bbq ",
    description: "Enjoy a nice evening barbecue with friends. Meet new people!",
    id: "1",
    image: "./images/bbq.jpeg"
},

{   title: "Rouge Hill Hiking trip",
    description: "Go hiking this summer with your friends. Prior experience is not required. Please sign waiver *",
    id: "2",
    image: "./images/hiking.jpeg"

},
{
    title: "Networking event",
    description: "Join a big group of talented alumni to network and discuss job opportunities.",
    id: "3",
    image: "./images/networking_event.jpeg"

}


];

const Events = () => {
    return (
        <div className="events-list">
            {events.map((event, index) => (
            
                <Event
                key = {index}
                title = {event.title}
                description={event.description}
                image = {event.image}
                />
             ) )

            }    
        </div>
    );
};



export default Events;