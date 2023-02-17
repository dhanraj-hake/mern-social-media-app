
export const authReducer = (state = { authData: null, loading : false, error: false, updateLoading : false }, action)=>{

    if(action.type === "AUTH_START"){
        return {...state, loading : true, error: false};
    }
    else if(action.type === "AUTH_SUCCESS"){
        
        localStorage.setItem("authData",JSON.stringify( {...action?.data}));
        return {...state, authData:action.data, loading : false, error : false};
    }
    else if(action.type === "AUTH_FAIL"){
        return {...state, loading : false, error:true};
    }

    if(action.type === "AUTH_USER_UPDATE"){

        return {...state,authData:action.data, loading:false, error:false};

    }

    if(action.type === "LOGOUT"){
        localStorage.clear();
        return {authData: null, loading : false, error: false, updateLoading : false}
    }

    if(action.type === "FOLLOW"){
        
        return {...state, authData:{...state.authData, user : {...state.authData.user, following : [...state.authData.user.following,action.userId]}}};
        
    }
    else if(action.type === "UNFOLLOW"){
        console.log(action)
        return {...state, authData:{...state.authData, user : {...state.authData.user, following : state.authData.user.following.filter((profileId)=>profileId !== action.userId)}}};
    }

    if(action.type=== "RESET_USER_DATA"){

        return {...state, authData:{...state.authData, user : action.data}};
    }

    return state;
}