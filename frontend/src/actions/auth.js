import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT
} from './types';

import axios from 'axios';

export const login=(username,password)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    };
    const body = JSON.stringify({ username , password });
    try{
        const res = await axios.post("http://127.0.0.1:3000/login/",body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
        console.log(res.data)
    }catch(err){
        dispatch({
            type:LOGIN_FAIL
        });
        return err.response.data
    }
    
}

export const register=(name,username,email,password)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    };
    const body = JSON.stringify({ name,username,email,password });
    console.log(body)
    try{
        const res = await axios.post("http://127.0.0.1:3000/register",body,config)
        dispatch({
            type:SIGNUP_SUCCESS,
            payload:res.data
        });
        dispatch(login(username,password))
        return res
    }catch(err){
        dispatch({
            type:SIGNUP_FAIL
        });
        return (err.response)
    }
    
}

export const logout = () => dispatch =>{
    dispatch({
        type:LOGOUT
    })
}