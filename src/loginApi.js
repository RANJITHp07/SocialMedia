import axios from "axios";


export const logincall=async(userCredintial,dispatch,navigate)=>{
    dispatch({type:"LOGIN_START"});
    try{
        const res=await axios.post("/auth/login",userCredintial);
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        localStorage.setItem("user",JSON.stringify(res.data))
        navigate("/")
    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }
}