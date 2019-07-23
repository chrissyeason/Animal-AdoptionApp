const express = require("express");
const router = express.Router();

const Dog = require("../models/dogs");

//INDEX ROUTE
router.get("/", (req,res)=>{

    console.log("The Index Route work");
    res.render("./dogs/index.ejs")
})
    


// NEW ROUTE

// POST/CREATE ROUTE

// SHOW ROUTE

// EDIT ROUTE

// UPDATE ROUTE

// DELETE ROUTE
