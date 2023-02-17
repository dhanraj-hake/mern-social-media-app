import React, { useState } from 'react'

import "./Auth.css"

import Logo from "../../img/logo.png"
import { useDispatch, useSelector } from 'react-redux'

import { loginAction, signupAction } from '../../store/actions/authAction'

const Auth = () => {

    const dispatch = useDispatch();

    
    let { error } = useSelector((state)=>state.authReducer);

    const [signupPage , setSignupPage] = useState(false);

    return (
        <div className='authpage '>
            <div className="authpageleft">

                <div className="authlogoname">
                    <div className="authimage">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="authname">
                        <span>Harsh Media ...</span>
                    </div>
                </div>
                <div className="about">
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            {signupPage ? <Signup setSignupPage={setSignupPage} error={error} /> :  <Login setSignupPage={setSignupPage} error={error}/>}
           

        </div>
    )
}


function Signup(props) {

    const { setSignupPage } = props;

    const [ signupError , setSignupError ] = useState(false);

    const dispatch = useDispatch();

    const loading = useSelector((state)=>state.authReducer.loading);


    const [userInfo , setUserInfo] = useState({firstname: "", lastname:"", username : "",  password: "", password2: "" })

    const onChangeHandler = (event)=>{
        setUserInfo({...userInfo, [event.target.name] : event.target.value});
    }

    const onSignupSubmit = (event) =>{
        event.preventDefault();

        if(userInfo.password === userInfo.password2){
            
            dispatch(signupAction(userInfo));

            setSignupError(false);
        }
        else{
            setSignupError(true);
        }

    }



    return (


        <div className="signupform">
            <form className='signupformflex' onSubmit={onSignupSubmit}>
                <div className="row">
                <h2>Sign up</h2>
                </div>
                <div className="row">
                    <input type="text" className='signupinput' onChange={onChangeHandler} name="firstname" id="firstname" placeholder='First Name' />
                    <input type="text" className='signupinput' onChange={onChangeHandler} name="lastname" id="lastname" placeholder='Last Name' />
                </div>
                <div className="row">
                    <input type="text" className='signupinput' onChange={onChangeHandler} name="username" id="username" placeholder='User Name' />
                </div>
                <div className="row">
                    <input type="password" className='signupinput' onChange={onChangeHandler} name="password" id="password" placeholder='Password' />
                    <input type="password" className='signupinput' onChange={onChangeHandler} name="password2" id="password2" placeholder='Confirm Password' />

                </div>
                <div className="error" style={{display : signupError ? "block" : "none"}}>
                    <span className='errormessage'>*Password Not Match</span>
                </div>
                <div className="row">
                    <span className='signuploginmessage' onClick={()=>{setSignupPage((signupPage)=>!signupPage)}}>Already have Account? Login</span>
                </div>

                    <button disabled={loading} className='btn signupbtn'>{loading? "Loading" :"Signup"}</button>
                
            </form>
        </div>

    );
}



function Login(props){

    const error = props.error;

    const [displayError, setDisplayError] = useState(false);

    console.log(error);
    const { setSignupPage } = props;
    const dispatch = useDispatch();

    const loading = useSelector((state)=>state.authReducer.loading);

    
    const [loginInfo , setLoginInfo] = useState({ username : "",  password: ""});

    const onChangeHandler = (event)=>{
        setLoginInfo({...loginInfo, [event.target.name] : event.target.value});

    }

    const onLoginSubmit = (event) =>{
        event.preventDefault();
        clearForm();
        console.log(loginInfo)
        dispatch(loginAction(loginInfo));
    }
    
    const clearForm = () =>{
        setDisplayError(true);
        const loginInfoBlank  = JSON.parse(JSON.stringify({ username : "",  password: ""}));
        setLoginInfo(loginInfoBlank);
    }



    return (

        <div className="loginform">
            <form onSubmit={onLoginSubmit}>
                <div className="row">
                   <h2 className='logintest'>Login</h2>
                </div>
                <div className="row">
                    <input type="text" onChange={onChangeHandler} name="username" value={loginInfo.username}  className='signupinput' placeholder='Username' />
                </div>
                <div className="row">
                    <input type="password" onChange={onChangeHandler} value={loginInfo.password} className='signupinput' name='password' placeholder='Password' />
                </div>
         
                    {displayError && error && <span className='signuploginmessage'>Incorrect Username or Password</span>}
                <div className="row">
                    <span className='signuploginmessage' onClick={()=>{setSignupPage((signupPage)=>!signupPage)}}>Don't Have a Account? Signup</span>
                </div>
                <button  disabled={loading} className='btn loginbtn'>{loading? "Loading": "Login"}</button>

            </form>
        </div>

    );
}





export default Auth;
