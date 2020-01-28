import React,{useRef,useContext,useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import BirthdayContext from '../../context/Birthday/BirthdayContext'
function FilterForm() {
    const birthdayContext = useContext(BirthdayContext);
    const text = useRef('')
    const {filterBirthday,clearFilter,filtered} = birthdayContext;

    useEffect(() =>{
        if(filtered === null){
            text.current.value= ''

        }
    })
    const onChange = e =>{
        if(text.current.value !== ''){
            filterBirthday(e.target.value)
        }
        else{
           clearFilter()
        }

    }
    
    
    return (
        <div style={{width:'25rem',paddingTop:'5rem'}}>
            <form>
                
                <TextField
                inputRef={text}
                id="standard-full-width"
                fullWidth
                style={{ margin: 8 }}
                placeholder="Filter Contacts..."
                
                
                onChange={onChange}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </form>
            
        </div>
    )
}

export default FilterForm
