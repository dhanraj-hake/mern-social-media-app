
export const postReducer = (state ={posts : [], error: false,updateLoading: false}, action) =>{

    if(action.type === "UPLOAD_START"){
        return {...state, error: false, updateLoading: true};
    }
    else if(action.type === "UPLOAD_SUCCESS"){
        
        return {...state,posts:[action.data,...state.posts], error: false, updateLoading:false};
    }
    else if(action.type === "UPLOAD_FAIL"){
        return {...state, loading: false, error: true, updateLoading:false};
    }

    if(action.type === "POST_RETREIVING_START"){
        return {...state, loading: true, error: false}
    }
    else if(action.type === "POST_RETREIVING_SUCCESS"){
        
        return {...state, posts : action.data , loading: false, error: true}
    }
    else if (action.type === "POST_RETREIVING_FAIL"){
        
        return {...state, loading: false, error: true}
    }
    

    return state;

}
