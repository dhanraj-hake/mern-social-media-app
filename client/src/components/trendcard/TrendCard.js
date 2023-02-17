import React from 'react'

import "./TrendCard.css"

import { TrendData } from "../../data/TrendData";

const TrendCard = () => {
    return (
        <div className='trendcard'>
            <h2>Trends for you</h2>

            {TrendData.map((trend, index) => {
                return (
                    <div key={index} className="trend">
                        <span className='name'>#{trend.name}</span>
                        <span className='shares'>{trend.shares} K Shares</span>
                    </div>
                );
            })}
        </div>
    )
}

export default TrendCard
