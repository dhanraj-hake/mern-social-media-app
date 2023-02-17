
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const FollowUserCard = (props) => {

    const profile = props.profile;

    const { user } = useSelector((state)=>state.authReducer.authData);

    const [ followed, setFollowed ] = useState(profile.followers.includes(user._id));

    const dispatch = useDispatch();

    const handalFollow = async() => {

        if(followed){
            
            try{
                const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/user/unfollow/${profile._id}`, {
                    method : 'PUT',
                    headers : {
                        "Content-Type": "application/json"
                    },
                    body : JSON.stringify({userId : user._id})
                })
    
                await response.json();
                dispatch({type: "UNFOLLOW", userId : profile._id})
                
            }
            catch(error){
                console.log(error);
            }
            
            console.log("Unfollow");
        }
        else{
            
            try{
                const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/user/follow/${profile._id}`, {
                    method : 'PUT',
                    headers : {
                        "Content-Type": "application/json"
                    },
                    body : JSON.stringify({userId : user._id})
                });
    
                const result = await response.json();
                dispatch({type: "FOLLOW", userId : profile._id})
                
                console.log(result);
            }
            catch(error){
                console.log(error);
            }   
            
            console.log("Following Request");
        }

        setFollowed((followed)=>!followed);


    }

  return (
    <div className="follower">
            <div className="imagename">
                <img src={profile.profileImage? process.env.REACT_APP_SERVER_PORT+"/images/"+profile.profileImage: process.env.REACT_APP_SERVER_PORT+"/images/defaultprofile.png"} alt="" />
                <div className="name">
                    <span className='bold'>{profile.firstname}</span>
                    <span>@{profile.username}</span>
                </div>
            </div>
            <button onClick={handalFollow} className={`btn ${followed? "unfollowbtn": ""}`}> { followed ? "Unfollow" : "Follow"}</button>
        </div>
  )
}

export default FollowUserCard;
