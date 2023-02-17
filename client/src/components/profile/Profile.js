import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetUserData } from '../../store/actions/authAction';
import Posts from '../posts/Posts';
import ProfileCard from '../profilecard/ProfileCard2';
import ProfileLeft from '../profileleft/ProfileLeft';
import TrendSide from '../trendside/TrendSide';

import "./Profile.css";

const Profile = () => {

  document.title = "Profile";

  const params = useParams();

  const profileId = params.id;

  const { user } = useSelector((state)=>state.authReducer.authData);

  const [ profileUser,setProfileUser] = useState({});

  const [posts , setPosts] = useState([])

  
  useEffect(()=>{

    const fetchProfileUser = async()=>{
      if(user._id === profileId){
        setProfileUser(user);
      }
      else{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/user/${profileId}`);

            const result = await response.json();
            setProfileUser(result);
          }
          catch(error){
          console.log(error);
        }
      }
      
      try{
        
        const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/post/user/${profileId}`);
        
        const result = await response.json();

        setPosts(result);
        // console.log(result);
      }
      catch(error){
        console.log(error);
      }


    }

    fetchProfileUser();
    
   // eslint-disable-next-line
  }, [user])


  const dispatch = useDispatch();

  useEffect(()=>{

      dispatch(resetUserData(user._id));
      console.log(user._id);
     // eslint-disable-next-line
  }, []);



  return (
    <div className='profilepage'>
      <ProfileLeft profileUser={profileUser} />

      <div className="profilecenter">
        <ProfileCard  profileUser={profileUser} posts={posts} page="profile" />
        <Posts page="profile" posts={posts}  profileUser={profileUser} />
      </div>

      <TrendSide />
      
    </div>
  )
}

export default Profile;
