import React, { useContext } from "react";
import alertContext from "../../context/alert/alertContext";
import Snackbar from "@material-ui/core/Snackbar";

import { makeStyles,createStyles } from "@material-ui/core/styles";
import MuiAlert,{ AlertProps } from '@material-ui/lab/Alert'
const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2)
      }
    }
  })
);
function Alert(props: AlertProps) {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}

function Alerts() {
   const handleClose = (reason) => {
     if(reason === 'clickaway')
        return
      

   
  };
  const classes = useStyles();
  
  const AlertContext = useContext(alertContext);
  return (
    <div className={classes.root}>
      {AlertContext.alerts.length > 0 &&
        AlertContext.alerts.map(alert => (
          <Snackbar open='true' autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alert.type}>
              {alert.msg}
            </Alert>
          </Snackbar>
        ))}
    </div>
  );
}

export default Alerts;
