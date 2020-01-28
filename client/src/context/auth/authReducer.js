import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    AUTH_ERROR,
    USER_LOADED,
    CLEAR_ERRORS,

} from '../types'

export default (state,action) =>{
    switch(action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                loading:false

            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return{
                isAuthenticated:false,
                loading:true,
                user:null,
                token:'',
                errors:action.payload
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                errors:null,
            }
        default :
            return state;
        
    }
}