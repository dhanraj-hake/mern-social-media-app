
const PORT = "http://127.0.0.1:8000";

export const timeLinePostAction = (id)=>{

    return async(dispatch)=>{

        dispatch({type : "POST_RETREIVING_START"})
        try{
            const response = await fetch(`${PORT}/post/timeline/${id}`);
            const result = await response.json();

            dispatch({type: "POST_RETREIVING_SUCCESS", data: result});
            console.log(result);
        }
        catch(error){
            dispatch({type : "POST_RETREIVING_FAIL"})
        }
    }
}
