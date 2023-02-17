const PORT = "http://127.0.0.1:8000";


export const UploadPostImage = (data)=>{

    return async(dispatch)=>{

        try{
            const response = await fetch(`${PORT}/uploadimage`,{
                method : "POST",
                body : data
            })

            const result = await response.json();

            console.log(result);
        }
        catch(error){
            console.log(error);
        }

    }
}

export const UploadPost = (data)=>{

    return async(dispatch)=>{

        try{
            dispatch({type: "UPLOAD_START"})
            const response = await fetch(`${PORT}/post`, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(data)
            });
            
            const result = await response.json();
            
            dispatch({type: "UPLOAD_SUCCESS", data: result});
        }   
        catch(error){
            dispatch({type: "UPLOAD_FAIL"})

        }

    }
}