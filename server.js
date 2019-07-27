const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const multer = require('multer');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoURI = 'mongodb://localhost:27017/'+'DogsAndCats';
const userController = require('./controllers/userController.js')
const catController = require('./controllers/catController.js')
const dogController = require('./controllers/dogController.js')
const session = require('express-session');
mongoose.connect(mongoURI, { useNewUrlParser: true }, () =>{
    console.log("the connection with mongodb is established")
 });
 app.use(session({
    secret: "SecretStuff",
    resave:false,
    saveUninitialized:false
}))

// app.use(multer({ dest: './uploads/',
//     rename: function (fieldname, filename) {
//       return filename;
//     },
//    }));
app.use(methodOverride('_method')); //For put and Delete
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userController);
app.use('/cats', catController);
app.use('/dogs', dogController);
app.use('/images', express.static('images'))

app.get('/', (req, res) =>{
    res.render('index.ejs');
})

app.get('/landing', (req, res)=>{
    res.render('landing.ejs')
})

app.listen(3000, ()=>{
    console.log("The animal App is ready!!!");
})