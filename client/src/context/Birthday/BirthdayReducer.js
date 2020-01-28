import {
    ADD_BIRTHDAY,
    DELETE_BIRTHDAY,
    UPDATE_BIRTHDAY,
    FILTER_BIRTHDAY,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    SET_CURRENT,
    GET_BIRTHDAY,
    
    BIRTHDAY_ERROR,
    CLEAR_BIRTHDAY
} from '../types'

export default (state,action) => {
    switch(action.type){
        case ADD_BIRTHDAY:
            return{
                ...state,
                test_birthdays:[action.payload,...state.test_birthdays],
                loading:false
            };
        case CLEAR_BIRTHDAY:
            return{
                ...state,
                test_birthdays:null
            };
            
        case GET_BIRTHDAY:
            return{
                ...state,
                test_birthdays:action.payload,
                loading:false
            };

        case BIRTHDAY_ERROR:
            return{
                ...state,
                error:action.payload
            }
        case UPDATE_BIRTHDAY:
            return{
                ...state,
                test_birthdays:state.test_birthdays.map(birthday => birthday._id === action.payload._id?action.payload:birthday),
                loading:false
            }
        case DELETE_BIRTHDAY:
            return{
                    ...state,
                    test_birthdays:state.test_birthdays.filter(birthday => birthday._id !== action.payload),
                    loading:false
                };
        case FILTER_BIRTHDAY:
            return{
                ...state,
               filtered:state.test_birthdays.filter(birthday =>{
                   const regex = RegExp(`${action.payload}`,'gi');
                   return birthday.name.match(regex) || birthday.email.match(regex);
               })
            };
        case CLEAR_FILTER:
            return{
                ...state,
                filtered:null
            }
        case SET_CURRENT:
            return{
                ...state,
                current:action.payload
            };
        case CLEAR_CURRENT:
            return{
                ...state,
                current: null
            };
        
        default :
            return state;    
    }

}