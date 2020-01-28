import React,{useReducer} from 'react';

import axios from 'axios'
import BirthdayContext from './BirthdayContext';
import BirthdayReducer from './BirthdayReducer';

import {
    ADD_BIRTHDAY,
    DELETE_BIRTHDAY,
    GET_BIRTHDAY,
    CLEAR_BIRTHDAY,
    SET_CURRENT,   
    UPDATE_BIRTHDAY,
    FILTER_BIRTHDAY,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    BIRTHDAY_ERROR
} from '../types'


const BirthdayState = props =>{
    const initialState ={
        test_birthdays:[],
        current:null,
        filtered:null,
        error:null
    }

    const[state,dispatch] = useReducer(BirthdayReducer,initialState);

    //Add birthday
    const addBirthday = async birthday =>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('http://localhost:5000/api/birthdays',birthday,config)
            console.log(res.data)
            dispatch({type:ADD_BIRTHDAY,payload:res.data})
            
        } catch (err)
         {
             dispatch({type:BIRTHDAY_ERROR,payload:err.response})
            
        }

        
    }
    //get birthday
    const getBirthday = async () =>{
        
        try {
            const res = await axios.get('http://localhost:5000/api/birthdays')
            console.log(res.data);
            
            
            dispatch({type:GET_BIRTHDAY,payload:res.data})
            
        } catch (err)
         {
             dispatch({type:BIRTHDAY_ERROR,payload:err.response})
            
        }

       
    }


    //Delete birthday
    const deleteBirthday = async id =>{
        try {
            await axios.delete(`http://localhost:5000/api/birthdays/${id}`);
            
            
            
            dispatch({type:DELETE_BIRTHDAY,payload:id});
            
        } catch (err)
         {
             dispatch({type:BIRTHDAY_ERROR,payload:err.response})
            
        }
       
    }
    //Update birthday
    const updateBirthday = async birthday =>{
        
        try {

            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const res = await axios.put(`http://localhost:5000/api/birthdays/${birthday._id}`,birthday,config);
            
            
            
            dispatch({type:UPDATE_BIRTHDAY,payload:res.data})
            
        } catch (err)
         {
             dispatch({type:BIRTHDAY_ERROR,payload:err.response})
            
        }
    }
    //Filter birthday
    const filterBirthday = text =>{
        dispatch({type:FILTER_BIRTHDAY,payload:text})
    }

    //Set current
        const setCurrent = birthday =>{
            dispatch({type:SET_CURRENT,payload:birthday})
        }
    //clear current
       const clearCurrent = () =>{
           dispatch({type:CLEAR_CURRENT})

       }
    //clear Filter
       const clearFilter = () =>{
        dispatch({type:CLEAR_FILTER})

    }
   // Clear Birthdays
        const clearBirthday= () =>{
            dispatch({type:CLEAR_BIRTHDAY});

        }


    return(
        <BirthdayContext.Provider
        value={{
            birthdays:state.test_birthdays,
            filtered:state.filtered,
            current:state.current,
            addBirthday,
            deleteBirthday,
            setCurrent,
            clearFilter,
            clearCurrent,
            updateBirthday,
            filterBirthday,
            getBirthday,
            clearBirthday
        }}>
            {props.children}
        </BirthdayContext.Provider>
       
    )
}
export default BirthdayState;