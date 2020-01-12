const express = require('express');
const router = express.Router();

// @routes   /api/users
// @des register a user
//access public

router.post('/',(req,res) => {
    res.send('Register a user')});

module.exports = router;