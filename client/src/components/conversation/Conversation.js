import React, { useEffect, useState } from 'react'
import "./Conversation.css"
const Conversation = (props) => {
    
    const { chat } = props; 
    const { curentUserId, onlineStatus } = props;

  const [user, setUser] = useState(null);
  
  useEffect(()=>{
   
    const user_id = chat.members.find((id)=>id!==curentUserId);
    console.log(user_id)

    const fetchUser = async ()=>{

        const response = await fetch(process.env.REACT_APP_SERVER_PORT+"/user/"+user_id);
        const result = await response.json();
        setUser(result);
    }
    fetchUser();
    
  }, [])

  console.log(onlineStatus)

  return (
    <div className='follower conversation'>
      <div>
          {onlineStatus && <div className="online-dot"></div>}
          <img src={user?.profilePicture ? process.env.REACT_APP_SERVER_PORT + "/images/" + user?.profilePicture : process.env.REACT_APP_SERVER_PORT + "/images/defaultprofile.png"} alt="" 
          className="followerImage profile-circle"
          style={{ width: "50px", height: "50px" }}/>
          <div className="chatname">
              <span>{user?.firstname} {user?.lastname}</span>
              <span className='online'>{onlineStatus ? "Online" : "Ofline"}</span>
          </div>
      </div>
    </div>
  )
}

export default Conversation;
