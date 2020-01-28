import React ,{ useReducer } from 'react';
import uuid from 'uuid'
import AlertContext from '../alert/alertContext';
import AlertReducer from '../alert/alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT


} from '../types'

const AlertState = props =>{
    const initialState = []
    const[state,dispatch] = useReducer(AlertReducer,initialState);

    const setAlert = (msg,type,open) =>{
        const id = uuid.v4();
        dispatch({ type:SET_ALERT ,payload:{msg,type,open,id}});
        setTimeout(() => {
            dispatch({type:REMOVE_ALERT,payload:id})
            
        }, 3000);
    }





   return(
        <AlertContext.Provider
        value={{
           alerts:state,
           setAlert
        }

        }>
            {props.children}
        </AlertContext.Provider>
   )


}
export default AlertState;