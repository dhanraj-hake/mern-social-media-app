import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { postReducer } from "./postReducer";


const reducer = combineReducers({
    authReducer : authReducer,
    postReducer : postReducer
})

export default reducer;
