import React from 'react'
import Posts from '../posts/Posts';
import PostShare from '../postshare/PostShare';

import "./PostSide.css"


const PostSide = () => {
  return (
    <div className='postside'>
        <PostShare />
        <Posts page="home" />
    </div>
  )
}

export default PostSide;
