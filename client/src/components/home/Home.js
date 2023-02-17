import React, { useEffect } from "react"; 
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetUserData } from "../../store/actions/authAction";
import PostSide from "../postside/PostSide";
import ProfileSide from "../profileside/ProfileSide";
import TrendSide from "../trendside/TrendSide";

import "./Home.css"


const Home = ()=>{

    const { user } = useSelector((state)=>state.authReducer.authData);

    const dispatch = useDispatch();

    useEffect(()=>{

        dispatch(resetUserData(user._id));
        console.log(user._id);
        // eslint-disable-next-line
    }, []);


    return (
        <div className="home">
            <ProfileSide />
            <PostSide />
            <TrendSide />
        </div>
    );
}

export default Home;