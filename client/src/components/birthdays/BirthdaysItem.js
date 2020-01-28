import React,{useContext} from "react";
import {  makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import CakeIcon from "@material-ui/icons/Cake";
import DeleteIcon from "@material-ui/icons/Delete";
import { CardActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import BirthdayContext from '../../context/Birthday/BirthdayContext';
// import setAuthToken from "../../utils/setAuthToken";

const useStyles = makeStyles(theme => ({
  card: {
    Width: "40%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F4F4F4",
    height:'18rem',
    
  },
  div: {
    width: "40%",
   padding:theme.spacing(1)
    
  },
  friend: {
    borderRadius: "6%",
    backgroundColor: " #06C24F",
    color: "#ffffff",
    boxShadow: "2",
    float: "right",
    fontSize: "15px",
    paddingLeft: "6%",
    paddingRight: "6%"
  },
  bestFriend: {
    borderRadius: "6%",
    float: "right",
    fontSize: "15px",
    backgroundColor: " #2D5FE8",
    color: "#ffffff",
    boxShadow: "2",
    paddingLeft: "6%",
    paddingRight: "6%"
  },
  text: {
    color: "#FC0081"
  },
  list: {
    listStyle: "none",
    padding: theme.spacing(0)
  },
  item: {
    padding: theme.spacing(1)
  }
}));

function BirthdaysItem({ birthdayProps }) {
  
  const classes = useStyles();
  const birthdayContext = useContext(BirthdayContext);
  const {deleteBirthday,setCurrent} = birthdayContext;
  const { _id,name, email, phone_num, preference, birthday } = birthdayProps;
  const onDelete = () => {
      deleteBirthday(_id)

  }
  
  return (
    <div className={classes.div}>
      <Card className={classes.card} >
        <CardContent>
          <h3 className={classes.text}>
            {name}{" "}
            <span
              className={
                preference === "bestfriend"
                  ? classes.bestFriend
                  : classes.friend
              }
            >
              {preference}
            </span>
          </h3>
          <ul className={classes.list}>
            {email && (
              <li className={classes.item} style={{ color: "#FC0081" }}>
                <i>
                  <EmailIcon />
                </i>{" "}
                {email}
              </li>
            )}
            {phone_num && (
              <li className={classes.item} style={{ color: "#FC0081" }}>
                <i>
                  <PhoneIcon />
                </i>
                {"  "}
                {phone_num}
              </li>
            )}
            {birthday && (
              <li className={classes.item} style={{ color: "#FC0081" }}>
                <i>
                  <CakeIcon />
                </i>
                {"  "}
                {birthday}
              </li>
            )}
          </ul>
        </CardContent>
        <CardActions>
          <Button variant="contained" startIcon={<EditIcon />} size="small" onClick={() => setCurrent(birthdayProps)}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            size="small"
            onClick={onDelete}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default BirthdaysItem;

BirthdaysItem.propTypes = {
  birthdayProps: PropTypes.object.isRequired
};
