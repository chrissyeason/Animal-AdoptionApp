const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const multer = require('multer');
const path= require('path');

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
    storage: storage
}).single('image')
//Middleware to use Storage for Upload
app.use(upload)

mongoose.connect(mongoURI, { useNewUrlParser: true }, () =>{
    console.log("the connection with mongodb is established")
 });


//Disk Storage

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
app.use(express.static('images'))

app.get('/', (req, res) =>{
    res.render('index.ejs');
})

app.get('/landing', (req, res)=>{
    res.render('landing.ejs')
})

app.listen(3000, ()=>{
    console.log("The animal App is ready!!!");
})

//Establish Connection with Mongo
mongoose.connect(mongoURI,{useNewUrlParser:true});
mongoose.connection.once("open",()=>{
    console.log("Connected to Mongo")
})

