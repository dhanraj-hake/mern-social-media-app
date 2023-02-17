import React, { useEffect, useState } from 'react'
import "./ProfileModel.css"

import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from 'react-redux';
import { UploadPostImage } from '../../store/actions/uploadPostAction';
import { updateUserAction } from '../../store/actions/authAction';

const ProfileModel = (props) => {

    const theme = useMantineTheme();

    const { modalOpened, setModalOpened } = props;

    const { user } = useSelector((state) => state.authReducer.authData);

    const {firstname, lastname, worksAt, livesin, country, relationship} = user;

    const [ userData , setUserData ] = useState({firstname: firstname?firstname: "", lastname: lastname?lastname: "",worksAt : worksAt? worksAt: "", relationship: relationship? relationship: "", country : country? country:"", livesin :livesin? livesin :""});

    const [profileImage, setProfileImage] = useState(null);

    const [ coverImage , setCoverImage] = useState(null);

    const dispatch = useDispatch();

    
    const onInputChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});

    }


    const onChangeImage = (event)=>{

        if(event.target.files && event.target.files[0]){


            if(event.target.name ==="profilePicture"){
                setProfileImage(event.target.files[0]);
            }
            else if(event.target.name ==="coverPicture"){
                setCoverImage(event.target.files[0]);
            }
        }
    }


    const handalUpdate = (event)=>{
        event.preventDefault();


        try{

            const updateData = {...userData, userId: user._id};

            if(profileImage){

                const data = new FormData();

                const imageName = Date.now() + profileImage.name;
                data.append("name", imageName);
                data.append("file", profileImage);
                updateData.profilePicture = imageName;
                dispatch(UploadPostImage(data));
                
                
            }
            
            if(coverImage){
                const data = new FormData();
                
                const imageName = Date.now() + coverImage.name;
                data.append("name", imageName);
                data.append("file", coverImage);
                updateData.coverPicture = imageName;
                dispatch(UploadPostImage(data));
            }

            dispatch(updateUserAction(user._id,updateData));
            setModalOpened(false);


            

        }
        catch(error){
            console.log(error);
        }


    }


    return (
        <Modal
            overlayColor={
                theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            size="55%"
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <form className='modalform'>

                <div className="row">
                    <input className='signupinput' type="text" name='firstname' value={userData.firstname}  onChange={onInputChange}  placeholder='First Name' />
                    <input className='signupinput' type="text" name='lastname'  value={userData.lastname} onChange={onInputChange} placeholder='Last Name' />
                </div>

                <div className="row">
                    <input
                        type="text"
                        className="signupinput"
                        name="worksAt"
                        placeholder="Works at"
                        onChange={onInputChange}
                        value={userData.worksAt}
                    />
                </div>
                <div className="row">
                    <input className='signupinput' type="text" value={userData.livesin} onChange={onInputChange} name='livesin' placeholder='Lives in' />
                    <input className='signupinput' type="text" value={userData.country} onChange={onInputChange} name='country' placeholder='Country' />
                </div>

                <div className="row">
                    <input className='signupinput' type="text" value={userData.relationship} onChange={onInputChange} name='relationship' placeholder='RelationShip Status' />
                </div>

                <div className=''>
                    Profile Image
                    <input type="file" name='profilePicture' onChange={onChangeImage} />
                    Cover Image
                    <input type="file" name="coverPicture" onChange={onChangeImage} />
                </div>

                <button className='btn updatebtn' onClick={handalUpdate} >Update</button>

            </form>


        </Modal>
    )
}

export default ProfileModel;
