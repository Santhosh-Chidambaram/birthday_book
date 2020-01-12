const express = require('express');
const router = express.Router();

// @routes    GET /api/birthdays
// @des get all birthdays
//access private

router.get('/',(req,res) => {
    res.send('get all birthdays')});


// @routes  POST /api/birthdays
// @des add birthdays
//access private

router.post('/',(req,res) => {
    res.send('add a birthday')});


// @routes  PUT /api/birthdays
// @des update birthdays
//access public

router.put('/:id',(req,res) => {
    res.send('update birthdays')});


// @routes  DELETE /api/birthdays
// @des update birthdays
//access public

router.delete('/:id',(req,res) => {
    res.send('delete  birthdays')});

    
module.exports = router;