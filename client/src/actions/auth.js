import * as api from "../api/index";

export const signin=(formData,history)=>async(dispatch)=>{

    try{
        //only after login ,push user to "/"
        const {data}=await api.signIn(formData);
        await dispatch({type:"AUTH",data});
        history.push("/");
    }
    catch(err)
    {
        console.log(err);
    }
}

export const signup=(formData,history)=>async(dispatch)=>{

    try{
        //only after register ,push user to "/"
        const {data}=await api.signUp(formData);
        await dispatch({type:"AUTH",data});
        history.push("/");
    }
    catch(err)
    {
        console.log(err);
    }
}