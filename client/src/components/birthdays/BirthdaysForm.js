import React ,{useState,useContext,useEffect} from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import BirthdayContext from '../../context/Birthday/BirthdayContext';





const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(0, 0, 2)
  }
}));

export default function BirthdaysForm() {
  const birthdayContext = useContext(BirthdayContext);
  const { addBirthday,current,clearCurrent,updateBirthday} = birthdayContext;

  const classes = useStyles();
  const [birthdayForm,setBirthdayForm] = useState({
    name:'',
    email:'',
    phone_num:'',
    preference:'friend',
    birthday:''
  })
  useEffect(()=>{
    if(current !== null){
      setBirthdayForm(current);
    }
    else{
      setBirthdayForm({
        name:'',
        email:'',
        phone_num:'',
        preference:'friend',
        birthday:''

      })
    }
   
  },[birthdayContext,current])

  const onChange = e => setBirthdayForm({
    ...birthdayForm,
    [e.target.name]:e.target.value,
    
  })
  
 const onSubmit = e => {
   e.preventDefault();
   if(current === null){
    addBirthday(birthdayForm);

   }
   else{
     updateBirthday(birthdayForm);
     console.log(birthdayForm._id);
     
   }
   clearAll();
   
   
 }
 const clearAll=()=>{
   clearCurrent()

   
 }
 
  const {name,email,phone_num,preference,birthday} = birthdayForm;

  return (
    <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
         {current?'Edit Birthday': 'Add Birthday'}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}  noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={onChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone_num"
            label="Phone Number"
            type="number"
            id="phone_num"
            value={phone_num}
            onChange={onChange}
          />
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="birthday"
            label="Birthday Date"
            name="birthday"
            value={birthday}
            onChange={onChange}
            autoFocus
          />
          <RadioGroup aria-label="position" name="preference" onChange={onChange}   row>
                <FormControlLabel
                value="friend"
                control={<Radio color="primary" />}
                label="friend"
                labelPlacement="end"
                checked={preference === "friend"}
                
              />
              <FormControlLabel
                value="bestfriend"
                control={<Radio color="primary" />}
                label="bestfriend"
                labelPlacement="end"
                checked={preference === "bestfriend"}
               
              />



          </RadioGroup>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            {current ?'Update':'Add'}
          </Button>
          {current && <div>
            <Button
             type="submit"
             fullWidth
             variant="contained"
             color="primary"
             onClick={clearAll}
             className={classes.submit}
           >Clear</Button> </div>
             

          }
          
        </form>
      </div>
    </Container>



    </div>
    
  );
}
