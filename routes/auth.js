const express = require('express');
const router = express.Router();

// @routes   POST api/auth
// @des logged in a user
//access privatee

router.post('/',(req,res) => {
    res.send('Log in  a user')});


// @routes   GET api/auth
// @des logged in a user
//access privatee
router.get('/',(req,res) => {
    res.send('get logged in  a user')});

module.exports = router;