import React from 'react'
import FollowersCard from '../followerscard/FollowersCard';

import LogoSearch from '../logosearch/LogoSearch';
import ProfileCard from '../profilecard/ProfileCard';

import "./ProfileSide.css"

const ProfileSide = () => {
  return (
    <div className='profile-side'>
      <LogoSearch />
      <ProfileCard page="home" />
      <FollowersCard />
    </div>
  )
}

export default ProfileSide
