import React, { useContext,Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import birthdayContext from '../../context/Birthday/BirthdayContext';
const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  
}));

export default function Navbar(props) {
  const classes = useStyles();
  const AuthContext = useContext(authContext)
  const BirthdayContext = useContext(birthdayContext)
  const { clearBirthday } =BirthdayContext;
  const  {logout,isAuthenticated,user} = AuthContext;
  const toLogout = () =>{
    logout();
    clearBirthday();
    
  }
  const authLinks = (
  <Fragment>
     <Button color="inherit" component={Link} to="/" >Home</Button>
    <Button color="inherit" >Hello,{ user && user.name}</Button>
    <Button color="inherit" onClick={toLogout}>Logout</Button>
  
  </Fragment>
  )
  const guestlinks =(
    <Fragment>
     
      <Button color="inherit" component={Link} to="/signup" >SignUp</Button>
      <Button color="inherit" component={Link} to="/signin" >SignIn</Button>

    </Fragment>

  )
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           {props.title}
          </Typography>
          
           {isAuthenticated?authLinks:guestlinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes={
    title:PropTypes.string.isRequired
}
Navbar.defaultProps = {
    title:'Birthday Book'
}