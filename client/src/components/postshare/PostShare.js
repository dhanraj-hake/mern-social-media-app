import React, { useState, useRef } from 'react'

import "./PostShare.css"


import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from 'react-redux';
import { UploadPost, UploadPostImage } from '../../store/actions/uploadPostAction';




const PostShare = () => {

    const [image, setImage] = useState(null);

    const imageRef = useRef(null);

    const decsRef = useRef(null);

    const user = useSelector((state)=>state.authReducer.authData.user);

    const uploading = useSelector((state)=>state.postReducer.updateLoading);

    const dispatch = useDispatch();


    const onImageClick = () => {
        imageRef.current.click();
    }


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];

            setImage({
                imageurl: URL.createObjectURL(file),
                image : file
            });
        }
    }

    const clearImage = ()=>{
        setImage(null);
    }


    const handalPostSubmit = (event) => {

        const post = {
            userId : user._id,
            desc : decsRef.current.value
        }
        
        if(image){
            const data = new FormData();
            const imageName = Date.now() + image.image.name;
            data.append("name", imageName);
            data.append("file", image.image)
            post.image = imageName;

            console.log(image.image)

            try{
                dispatch(UploadPostImage(data));
            }
            catch(error){
                console.log(error);
            }
        }
        dispatch(UploadPost(post));
        clearOnPost();

    }

    const clearOnPost = ()=>{
        setImage(null);
        decsRef.current.value = "";
    }


    return (
        <div className='postshare'>

            <div className="profilesearch">
                <img src={user.profilePicture ? process.env.REACT_APP_SERVER_PORT +"/images/"+ user.profilePicture : process.env.REACT_APP_SERVER_PORT+"/images/defaultprofile.png"} alt="" />
                <div className="postsearch">
                    <input ref={decsRef} className='postsearchinput' type="text" placeholder="What's happening" />
                </div>
            </div>

            <div className="icons">

                <div className="icon photo">
                    <UilScenery onClick={onImageClick} />
                    <span onClick={onImageClick} >Photo</span>
                </div>
                <div className="icon video">
                    <UilPlayCircle />
                    <span>Video</span>
                </div>
                <div className="icon location">
                    <UilLocationPoint />
                    <span>Location</span>
                </div>


                <div className="icon shedule">
                    <UilSchedule />
                    <span>Shedule</span>
                </div>

                <div className="icon postbtn">
                    <button disabled={uploading} onClick={handalPostSubmit} className='btn'>{uploading? "Loading..": "Share"}</button>
                </div>

                <div style={{ display: "none" }} className="puloadphoto">
                    <input type="file" ref={imageRef} onChange={onImageChange} />
                </div>
            </div>

            {image && <div className="previewimage">
                <UilTimes className="clearimage" onClick={clearImage} />
                <img src={image.imageurl} alt="" />
            </div>}


        </div>
    )
}

export default PostShare;
