const express = require('express');
const router = express.Router();
const { check,checkBody,validationResult } = require('express-validator');

const auth = require('../middlewares/auth');
const Birthday = require('../models/Birthdays');


// @routes    GET /api/birthdays
// @des get all birthdays
//access private

router.get('/',auth,async (req,res) => {
    try {
        const birthdays_list = await Birthday.find({ user:req.user.id }).sort({date:-1});
        
        res.json(birthdays_list);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:"Server error"});
        
    }
    
    
});


// @routes  POST /api/birthdays
// @des add birthdays
//access private

router.post('/',[
    auth,[
        check('name','name is required').not().isEmpty(),
        check('email','Email is required').isEmail(),
        check('phone_num','Phone number should be a number not a string and maximum 10 numbers').isNumeric().isLength({max:10}),
        check('birthday','Enter a valid date format').not().isEmpty()
    ]
],async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})

    }
    const { name, email,phone_num,birthday} = req.body;
    console.log(req.body);
    
    
    try {
        const newbirthdays = new Birthday({user:req.user.id,name,email,phone_num,birthday});
        const birthdays_lst = await newbirthdays.save();
        res.json(birthdays_lst)
        
    } catch (err) {
        console.error(err.message)
        res.status(501).json({msg:"serverr error"})
        
    }
    
});


// @routes  PUT /api/birthdays
// @des update birthdays
//access public

router.put('/:id',auth,async (req,res) => {
    const{name,email,phone_num,birthday,preference}= req.body;
    birthdayFields = {};
    if(name) birthdayFields.name  = name;
    if(email) birthdayFields.email  = email;
    if(phone_num) birthdayFields.phone_num  = phone_num;
    if(preference) birthdayFields.preference  = preference;

    try {
        console.log(req.params.id);
        let birthdayForm = await Birthday.findById(req.params.id);
        if(!birthdayForm) return res.status(404).json({msge:"Birthday not found"});
        
        // user owns that birthday form
        if(birthdayForm.user.toString() !== req.user.id){
            return res.status(401).json({msg:"Not authorised"});
        }
        birthdayForm = await Birthday.findByIdAndUpdate(
            req.params.id,
            { $set:birthdayFields},
            {new:true}
            );

        res.json(birthdayForm);

    
    
    
    } catch (er) {
        console.error(er.message);
        res.status(500).send('Server Error');

        
    }
   
});


// @routes  DELETE /api/birthdays
// @des update birthdays
//access public

router.delete('/:id',auth,async (req,res) => {
    try {
            let birthdayForm = await Birthday.findById(req.params.id);
            if(!birthdayForm) return res.status(401).json({msg:"Birthday not found"});
            if(birthdayForm.user.toString() !== req.user.id) return res.status(401).json({msg:"Not authorised"});
            await Birthday.findByIdAndRemove(req.params.id);
            res.json({msg:'Birthday deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
   
});

    
module.exports = router;