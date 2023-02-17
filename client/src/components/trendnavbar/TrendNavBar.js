import React from 'react';
import "./TrendNavBar.css";

import HomeLogo from "../../img/home.png";
import Notifiaction from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from 'react-router-dom';

const TrendNavBar = () => {
  return (
    <div className='trendnav'>

      <Link to="/">
        <img src={HomeLogo} alt="" />
      </Link>
      <img src={Notifiaction} alt="" />

      <Link to="/chat" >
      <img src={Comment} alt="" />
      </Link>

      <UilSetting width="2rem" height="2rem" />
    </div>
  )
}

export default TrendNavBar;
