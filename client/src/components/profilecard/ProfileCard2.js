import React from 'react'

import "./ProfileCard.css";

import { Link } from 'react-router-dom';


const ProfileCard = (props) => {


    let profilePage = props.page === "profile";

    const user = props.profileUser;

    const posts = props.posts;


    return (
        <div className='profilecard'>
            <div className='profileimagebox' >

                <img className="backgroundimage" src={user.coverPicture ?  process.env.REACT_APP_SERVER_PORT+"/images/"+ user.coverPicture : process.env.REACT_APP_SERVER_PORT+"/images/defaultcover.jpg"} alt="" />
                <img className="profileimage" src={user.profilePicture? process.env.REACT_APP_SERVER_PORT+"/images/"+ user.profilePicture:process.env.REACT_APP_SERVER_PORT+"/images/defaultprofile.png"} alt="" />

            </div>


            <div className="profilename">
                <span className='name'>{user.firstname} {user.lastname}</span>
                <span className='tag'>{user.worksAt? user.worksAt: "Write about yourself"}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow followers">
                        <span>{user.followers? user.followers.length:""}</span>
                        <span>Followers</span>
                    </div>

                    <div className="vr">
                    </div>

                    <div className="follow follwing">
                        <span>{user.following ? user.following.length:""}</span>
                        <span>Following</span>

                    </div>

                    {profilePage && (
                        <>
                            <div className="vr">
                            </div>
                            <div className="follow follwing">
                                <span>{posts.length}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}

                </div>
                <hr />
            </div>
            {profilePage ? "": (    
            <div className="profile">
                <Link style={{textDecoration : "none", color : "inherit"}} to={`/profile/${user._id}`} >
                <span>My Profile</span>
                </Link>
            </div>
            )}

        </div>
    )
}

export default ProfileCard;
