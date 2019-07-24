const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoURI = 'mongodb://localhost:27017/'+'Animals';
// const session = require('express-session');
mongoose.connect(mongoURI, { useNewUrlParser: true }, () =>{
    console.log("the connection with mongodb is established")
});
const catController = require('./controllers/catController');

// MIDDLEWARE
app.use(methodOverride('_method')); //For put and Delete
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cats', catController);


// app.use(session({
//     secret: "SecretStuff",
//     resave:false,
//     saveUninitialized:false
// }))

app.get('/', (req, res) =>{
    // res.send("we working!!!")
    res.render('index.ejs');
})

app.listen(3000,()=>{
    console.log("The animal App is ready!!!");
})