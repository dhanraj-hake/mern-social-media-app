import React, { useState } from 'react'

import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModel from '../profilemodel/ProfileModel';
import { useDispatch, useSelector } from 'react-redux';

const InfoCard = (props) => {

  const [modalOpened, setModalOpened] = useState(false);

  const profileUser = props.profileUser;

  const { user } = useSelector((state) => state.authReducer.authData);

  const dispatch = useDispatch();



  const handalLogOut = ()=>{
      dispatch({type : "LOGOUT"});
  }


  return (
    <div className='infocard'>

      <div className="infohead">
        <h4>Profile Info</h4>
        {user._id === profileUser._id && <UilPen onClick={() => { setModalOpened(true) }} />
        }<ProfileModel modalOpened={modalOpened} setModalOpened={setModalOpened} />
      </div>

      <div className="info">
        <span className='infotitle'>Status </span>
        <span className='infovalue'>{profileUser.relationship}</span>
      </div>


      <div className="info">
        <span className='infotitle'>Lives in </span>
        <span className='infovalue'>{profileUser.livesin}</span>
      </div>


      <div className="info">
        <span className='infotitle'>Works at </span>
        <span className='infovalue'>{profileUser.worksAt}</span>
      </div>

      <div className="logoutbutton">
        <button className='btn logout' onClick={handalLogOut} >Logout</button>
      </div>

    </div>
  )
}

export default InfoCard;
