const express = require('express');
const router = express.Router();
const { check,validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth =  require('../middlewares/auth');

// @routes   GET api/auth
// @des logged in a user
//access privatee
router.get('/',auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

        
    } catch (error) {
        console.error(error.message);
        res.status(501).json({msg:"server error"})
        
    }
});


// @routes   POST api/auth
// @des logged in a user
//access privatee

router.post('/',[
    check('email','Enter a valid email').isEmail(),
    check('password','Renter the password correctly').exists()
],async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }
    const { email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({msg:"Invalid credentials"});
        }
        const isPwdCorrect = await bcrypt.compare(password,user.password);
        if(!isPwdCorrect){
            res.status(400).json({msg:"Invalid credentials"});

        } 
        const payload = {
            user:{
                id:user.id,
                isCrendentialCorrect:true,
                username:user.name
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},(err,token)=>{
            if(err) throw(err);
            res.json({token})
        });


        
    } catch (err) {
        console.error(err);
        res.status(500).send('server error');
        
    }
});


module.exports = router;