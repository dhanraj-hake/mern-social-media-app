import React, { useState } from 'react';

import "./Post.css";


import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux';




const Post = (props)=>{
    
    const post = props.post;

    const { user } = useSelector((state)=>state.authReducer.authData);
    const [liked, setLiked] = useState(post.likes.includes(user._id));


    const [likes, setLikes] = useState(post.likes.length);

    const ImageBaseURL = "http://127.0.0.1:8000/images/";

    const handalOnLike = async()=>{
        
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/post/like/${post._id}`,{
                method : "PUT",
                headers : {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({userId: user._id})
            });
    
            const result = await response.json();
            console.log(result)
            setLikes(liked?likes-1: likes+1);
            setLiked((liked)=>!liked);
        }
        catch(error){
            console.log(error);
        }

    }


    return (
        
        <div className="post">
                
           {post.image&& <div className="postimage">
                <img src={ImageBaseURL+post.image} alt="" />
            </div>}

            <div className="reactions">
                <img src={liked ? Heart : NotLike} alt="" onClick={handalOnLike} />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>

            <div className="likes">
                <span > {likes} Likes </span>
            </div>

            <div className="detail">
                <span className='name'>{post.name}</span>
                <span className='desc'>{post.desc}</span>
            </div>

        </div>


    );
}



export default Post;