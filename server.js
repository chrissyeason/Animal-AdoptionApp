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

//SET Storage Engine
const storage = multer.diskStorage({
    destination:'./public/uploads/', 
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() +
         path.extname(file.originalname));
    }
})

//INIT Upload.
const upload = multer({
    storage: storage,
    fileFilter : function(req, file, cb){
    checktypeofFile(file,cb)
}
}).single('image')

//Middleware to use Storage for Upload for Multer.
app.use(upload)


//  Check to  make Sure File Matches image Extensions of jpg,png, jpeg 
function checktypeofFile(file,cb){

    const fileTypes = /jpg|jpeg|gif|png/;//Types of Files Allowed
    //Check extension Matches fileTypes
    console.log(file);
    
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //console.log(extName);

    //check MimeType
    const mimeType = fileTypes.test(file.mimetype);
    //console.log(mimeType);

    if(extName && mimeType){
        return cb(null,true);
    }
    else {
            cb("Error: Allows Image Files Only")
        }
}

mongoose.connect(mongoURI, { useNewUrlParser: true }, () =>{
    console.log("the connection with mongodb is established")
 });


 app.use(session({
    secret: "SecretStuff",
    resave:false,
    saveUninitialized:false
}))

app.use(methodOverride('_method')); //For put and Delete
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userController);
app.use('/cats', catController);
app.use('/dogs', dogController);
app.use('/images', express.static('images'));
app.use('/static', express.static('static'));
app.use('/public/uploads', express.static('public/uploads')); //For Images users will upload

app.get('/', (req, res) =>{
    res.render('landing.ejs');
})

app.get('/about', (req, res)=>{
    res.render('about.ejs')
})

app.listen(3000, ()=>{
    console.log("The animal App is ready!!!");
})

//Establish Connection with Mongo
mongoose.connect(mongoURI,{useNewUrlParser:true});
mongoose.connection.once("open",()=>{
    console.log("Connected to Mongo")
})

