const express = require("express");
const router = express.Router();

const Dog = require("../models/dogs.js");

//INDEX ROUTE
router.get("/", async(req,res)=>{
    try{
        const allDogs = await Dog.find()
        console.log(allDogs)
        res.render("./dogs/index.ejs",{
            dogs:allDogs
        })
    }
 catch(err){
    //console.log(err);
    res.send(err); 
}
})

//NEW ROUTE
router.get("/new", (req, res) => {
    res.render("dogs/new.ejs")
})
    
//CREATE ROUTE
router.post('/', async(req, res) => {
    try{
        const newDog =  await Dog.create(req.body)
        res.redirect('/dogs'); 
    }
catch(err){
    res.send(err);
    console.log(err);
}
    
})

//SHOW ROUTE
router.get("/:id", async(req, res) => {
    const foundDog = await Dog.findById(req.params.id)
    res.render('dogs/show.ejs', {
        oneDog:foundDog
    });
});

//FILE POST
router.post('/images', (req, res) => {
res.send(test)
});


//DELETE
router.delete("/:id", async(req, res) => {
    try{
        const deleteDog = await Dog.findOneAndDelete({ _id: req.params.id });
        res.redirect('/dogs');
    }
  catch(err){
    console.log(err);
      res.send(err);
  }
})

//EDIT ROUTE
router.get("/:id/edit", async(req, res) => {
    try{
        const foundDog = await Dog.findById(req.params.id)
        res.render('dogs/edit.ejs', {
            oneDog:foundDog
    })
}
    catch(err){
        console.log(err);
        res.send(err);
    }
        
    })

    //PUT ROUTE
    router.put("/:id", async(req, res) => {
        try{
            const newDog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.redirect('/dogs');
        }
    
        catch(err){
            console.log(err);
            res.send(err);
        }
    })

    module.exports = router;
