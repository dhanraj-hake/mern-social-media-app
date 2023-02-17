import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers";



const saveToLocalStorage = (store)=>{

    try{
        localStorage.setItem("store", JSON.stringify(store));
    }
    catch(error){
        console.log(error);
    }
}

const loadFromLocalStorage = ()=>{
    try{
        const store = JSON.parse(localStorage.getItem("store"));
        if(store==null){
            return undefined;
        }
        return store;
    }
    catch(error){
        console.log(error);
        return undefined;
    }
}

const localStorageState = loadFromLocalStorage();

const store = createStore(reducer, localStorageState, applyMiddleware(thunk));
store.subscribe(()=>saveToLocalStorage(store.getState()));

export default store;