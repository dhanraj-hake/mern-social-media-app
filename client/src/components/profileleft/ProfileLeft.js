import React from 'react'
import FollowersCard from '../followerscard/FollowersCard'
import InfoCard from '../infocard/InfoCard'
import LogoSearch from '../logosearch/LogoSearch'

import "./ProfileLeft.css";

const ProfileLeft = (props) => {


  const profileUser = props.profileUser;


  return (
    <div className='profileleft'>
        <LogoSearch />
        <InfoCard profileUser={profileUser} />
        <FollowersCard />

    </div>
  )
}

export default ProfileLeft
