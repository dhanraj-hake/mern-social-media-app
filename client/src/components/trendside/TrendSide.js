import React from 'react'

import "./TrendSide.css"

import TrendNavBar from '../trendnavbar/TrendNavBar';
import TrendCard from '../trendcard/TrendCard';

const TrendSide = () => {
  return (
    <div className='trendside'>
        <TrendNavBar />
        <TrendCard />
        <div className="sherebutton">
            <button className="btn sherebtn">Share</button>
        </div>
    </div>
  )
}

export default TrendSide;
