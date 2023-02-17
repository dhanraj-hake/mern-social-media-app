import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { timeLinePostAction } from '../../store/actions/timeLinePostAction';
import Post from '../post/Post'

import "./Posts.css";

const Posts = (props) => {

  const page = props.page;

  const { user } = useSelector((state)=>state.authReducer.authData);

  const posts = useSelector((state)=>state.postReducer.posts);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(timeLinePostAction(user._id));
    // eslint-disable-next-line
  }, [])

  return (
    <div className='posts'>
            
    {page === "home" && posts && posts.map((post, index)=>{
        return <Post key={index} post={post} id={index} />
    })}

    {page === "profile" && props.posts.map((post, index)=>{
        return <Post key={index} post={post} id={index} />
    })}


    </div>
  )
}

export default Posts
