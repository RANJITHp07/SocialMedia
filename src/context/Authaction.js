export const LoginStart=(userCredintial)=>({
    type:"LOGIN_START"
})

export const Loginsuccess=(user)=>({
    type:"LOGIN_SUCCESS",
    payload:user
})

export const Loginfailure=(err)=>({
    type:"LOGIN_FAILURE",
    payload:err
})