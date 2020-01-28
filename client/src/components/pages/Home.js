import React, { useEffect, useContext} from 'react'
import Birthdays from '../../components/birthdays/Birthdays'
import BirthdaysForm from '../../components/birthdays/BirthdaysForm'
import '../../App.css';
import authContext from '../../context/auth/authContext'
import setAuthToken from '../../utils/setAuthToken';

function Home() {
    
    useEffect(() => {
        setAuthToken(localStorage.token);
        

        
      }, [])
    return (
        <div className='grid-2'>
           <div>
           <BirthdaysForm/>

           </div>
            <div>
           
            <Birthdays/>
            </div>
            
            
            
           
        </div>
    )
}

export default Home
