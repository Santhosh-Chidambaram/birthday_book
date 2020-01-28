const express = require('express');
const router = express.Router();
const { check,validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// @routes   /api/users
// @des register a user
//access public

router.post('/',
[
    check('name','name is required').not().isEmpty(),
    check('email','email is mandatory').isEmail(),
    check('password').isLength({min:6})
]
,async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})

    }
    const { name, email,password} = req.body;
    
    try {
       
       let user = await User.findOne({email});
        if(user){
            res.status(400).json({msg:'user already exists'});
        }
        user = new User({name,email,password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        

        const payload = {
            user :{
                id:user.id,
                name:user.name
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token) =>{
            if(err) throw err;
            res.json({token});
        })

        
        
    } catch (err) {
        console.error(err);
        res.status(500).send('server error');
    }
});


module.exports = router;  