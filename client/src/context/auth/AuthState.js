import React ,{ useReducer } from 'react';
import axios from 'axios'
import authContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    AUTH_ERROR,
    USER_LOADED,
    CLEAR_ERRORS



} from '../types'

const AuthState = props =>{
    const initialState ={
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        errors:null,
        user:null

    }
    const[state,dispatch] = useReducer(authReducer,initialState);

    //load user
    const LoadUser = async() =>{
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
       
        
        try {
            const res = await axios.get('http://localhost:5000/api/auth')
            dispatch({type:USER_LOADED,payload:res.data})
            
        } catch (err) {
            dispatch({type:AUTH_ERROR,payload:err.response.data.msg})
            
        }
    }

    //login user
    const login = async formData =>{
        console.log(formData)
        const config ={
            headers: {
                'Content-Type':'application/json'
            }
        }
        
        try {
            const res = await axios.post('http://localhost:5000/api/auth',formData,config);
            dispatch({type:LOGIN_SUCCESS,payload:res.data})
            LoadUser()
            
        } catch (err) {
            dispatch({type:LOGIN_FAIL,payload:err.response})
            
        }
        

    }


    //register user
    const register = async formData =>{
        console.log(formData)
        const config ={
            headers: {
                'Content-Type':'application/json'
            }
        }
        console.log(config)
        try {
            const res = await axios.post('http://localhost:5000/api/users',formData,config);
            dispatch({type:REGISTER_SUCCESS,payload:res.data});

            LoadUser()
            
        } catch (err) {
            dispatch({type:REGISTER_FAIL,payload:err.response.data.msg})
            
        }
        

    }


    //logout user
    const logout = () =>{
        dispatch({type:LOGOUT})

    }
    //clear errors
    const clearErrors =() =>{
        dispatch({type:CLEAR_ERRORS})
    }




   return(
        <authContext.Provider
        value={{
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            errors:state.errors,
            token:state.token,
            user:state.user,
            register,
            login,
            LoadUser,
            logout,
            clearErrors
        }

        }>
            {props.children}
        </authContext.Provider>
   )

 
}
export default AuthState;