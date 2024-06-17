import React from 'react'

import { Helmet } from 'react-helmet'

import Hero9 from '../components/hero9'
import Features1 from '../components/features1'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Rendezvous</title>
        <meta property="og:title" content="Rendezvous" />
      </Helmet>
      <Hero9></Hero9>
      <Features1></Features1>
    </div>
  )
}

export default Home