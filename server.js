const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(methodOverride('_method')); //For put and Delete
app.use(bodyParser.urlencoded({ extended: true }));

// const session = require('express-session');

// app.use(session({
//     secret: "SecretStuff",
//     resave:false,
//     saveUninitialized:false
// }))

app.get('/', (req, res) =>{
    res.send("we working!!!")
})
const mongoURI = 'mongodb://localhost:27017/'+'animals';

app.listen(3000,()=>{
    console.log("The animal App is ready!!!");
})