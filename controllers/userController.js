const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// NEW ROUTE
router.get("/new", (req, res)=>{
    try{
        res.render("user/new.ejs");
    }catch(err){
        res.send(err)
        console.log(err)
    }
})

// create new user route
router.post('/', async (req, res) =>{
    try{
        const salt = bcrypt.genSaltSync();
        console.log(req.body)
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const newUser = await User.create(req.body);
        req.session.userId = newUser._id;
        res.redirect('./landing');
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

// log in get route render login.ejs 
router.get('/login', (req, res)=>{
   res.render('user/login.ejs')
});

// // log in post route
router.post("/login", async (req, res)=>{
    try{
        const userFromDb = await User.findOne({username: req.body.username})
        const passwordIsValid = bcrypt.compareSync(req.body.password, userFromDb.password)

        if(passwordIsValid){
                req.session.userId = userFromDb._id;
                res.redirect('user/landing')
                console.log(userFromDb)
            }else{
                res.send("not valid password")
            }
    }catch(err){
        res.send(err)
        console.log(err)
    }
})

module.exports = router;