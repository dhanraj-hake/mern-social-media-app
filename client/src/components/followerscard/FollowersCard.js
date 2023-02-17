import React, { useEffect, useState } from 'react'
import "./FollowersCard.css"

import FollowUserCard from '../followusercard/FollowUserCard';
import { useSelector } from 'react-redux';



const FollowersCard = () => {

    const [suggestedUsers, setSuggestedUsers] = useState([]);

    const { user } = useSelector((state) => state.authReducer.authData);


    useEffect(() => {

        const fetchSuggestedUsers = async () => {

            const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/user/suggestions/${user._id}`);

            let result = await response.json();

            setSuggestedUsers(result.reverse());
        }

        fetchSuggestedUsers();

         // eslint-disable-next-line
    }, [])

    return (

        <div className='followersCard'>
            <h3>Suggested People</h3>

            {suggestedUsers.map((profile, index) => {
            if(profile._id !== user._id){
                return <FollowUserCard profile={profile} key={index}  />
            }
            else{
                return "";
            }
            })}




        </div>
    )
}

export default FollowersCard;
