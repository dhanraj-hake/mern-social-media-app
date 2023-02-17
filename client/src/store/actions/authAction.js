const PORT = process.env.REACT_APP_SERVER_PORT;

export const loginAction = (data) => {

    return async (dispatch) => {

        try {
            dispatch({ type: 'AUTH_START' })
            const response = await fetch(`${PORT}/auth/login`, {
                method: 'POST',
                headers : {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if(result.success){
                dispatch({ type: 'AUTH_SUCCESS', data:result })
                console.log(result);
            }
            dispatch({ type: 'AUTH_FAIL' })
        }
        catch (error) {
            dispatch({ type: 'AUTH_FAIL' })
        }
    }
}

export const signupAction = (data) => {
    return async (dispatch) => {

        try{
            console.log(data)
            dispatch({ type: 'AUTH_START' })
            const response = await fetch(`${PORT}/auth/signup`, {
                method: "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data)
            });

    
            const result = await response.json();
            if(result.success){
                dispatch({ type: 'AUTH_SUCCESS', data:result })
                console.log(result);
            }
            else{
                dispatch({ type: 'AUTH_FAIL' })
            }
            
        }
        catch(error){
            console.log(error);
            dispatch({ type: 'AUTH_FAIL' })
        }
    }
}

export const updateUserAction= (id, data)=>{

    return async (dispatch) => {


        try{
            const response = await fetch(`${PORT}/user/${id}`, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data)
            });

            const result = await response.json();

            if(result.success){
                dispatch({ type: 'AUTH_USER_UPDATE', data:result });
            }

        }
        catch(error){
            console.log(error);
        }

    }
}

export const resetUserData = (id)=>{
    return async (dispatch) => {


        try{
            const response = await fetch(`${PORT}/user/${id}`, {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            const result = await response.json();
            dispatch({ type: 'RESET_USER_DATA', data:result});
        }
        catch(error){

        }
    }
}