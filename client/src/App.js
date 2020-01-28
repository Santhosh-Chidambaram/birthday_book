import React, { useEffect,useContext} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/layouts/Navbar'
import Home from './components/pages/Home'
import Signup from './components/pages/Signup';
import Signin from './components/pages/Signin';
import BirthdayState from './context/Birthday/BirthdayState';

import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'
import authContext from './context/auth/authContext'
import Alerts from './components/pages/Alerts';



function App() {
  const AuthContext = useContext(authContext);
  const { LoadUser } = AuthContext;
  
  useEffect(() =>{
      setAuthToken(localStorage.token);
      LoadUser();

      
      
  },[])
  
  
  return (
    
    <BirthdayState>
      <AlertState>
      <Router>
      <Navbar/>
      
      <div className='container'>
        <Alerts/>
        
        <Switch>
          <PrivateRoute exact path='/' component={Home}/>
          
          <Route exact path='/signin' component={Signin}/>
          <Route exact path='/signup' component={Signup}/>


        </Switch>
      
      </div>

     </Router>
     </AlertState>
    </BirthdayState>
    
    
    
  );
}

export default App;
