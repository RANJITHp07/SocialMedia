import React,{createContext, useReducer} from "react";
import { AuthReducer } from "./Authreducer";

const InitialState={
    user:null,
    isFetching:false,
    err:false
}

export const Authcontext=createContext(InitialState)

export const AuthcontextProvider=({children})=>{
    const[state,dispatch]=useReducer(AuthReducer,InitialState)

    return(
        <Authcontext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            err:state.err,
            dispatch,
        }}>
            {children}
        </Authcontext.Provider>
    )
}