import React from 'react'

import { Helmet } from 'react-helmet'

import Hero7 from '../components/hero7'
import Features18 from '../components/features18'
import Team5 from '../components/team5'
import './about.css'

const About = (props) => {
  return (
    <div className="about-container">
      <Helmet>
        <title>About - Rendezvous</title>
        <meta property="og:title" content="About - Rendezvous" />
      </Helmet>
      <Hero7></Hero7>
      <Features18></Features18>
      <Team5></Team5>
    </div>
  )
}

export default About
