import React, { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet'
import CTA1 from '../components/cta1'
import EventList from './event-list'
import RecommendList from './event-recommendation';
import './events.css'
import './event-list.css'
const HostEvent = (props) => {  

    return (
        
        <div className='events-container'>
            <Helmet>
                <title>Events - Rendezvous</title>
                <meta property="og:title" content="Events - Rendezvous" />
            </Helmet>
            <CTA1 rootClassName="cta1-root-class-name"></CTA1>
            <RecommendList rootClassName="recommend-list-root-class-name"></RecommendList>
            <EventList rootClassName="event-list-root-class-name"></EventList>           
        </div>
        
    );
};
export default HostEvent;

