const express = require('express');
const router = express.Router();
const Cats = require('../models/cats.js');

// INDEX ROUTE
router.get('/', async (req, res) =>{
    try {
        const cats = await Cats.find();
        res.render('./cats/index.ejs', {
            cats : cats
        });
    }catch(err){
        console.log(err);
        res.send(err)
    }
})

// NEW ROUTE
router.get('/new', (req, res) =>{
    res.render('./cats/new.ejs', {
        
    });
})

// CREATE/POST ROUTE
router.post('/', async (req, res)=>{

    try {
        await Cats.create(req.body);
        var newCat = new Cat();
 newCat.img.data = fs.readFileSync(req.files.userPhoto.path)
 newCat.img.contentType = 'image/png';
 newCat.save();
        res.redirect('/cats');
        console.log(req.body);
    }catch(err){
        res.send(err)
        console.log(err)
    }
})
// SHOW ROUTE
router.get('/:id', async (req, res) =>{
    const cat = await Cats.findById(req.params.id);
    res.render('./cats/show.ejs', {
        cats : req.body.cat,
        cat : cat
    })
})

// EDIT ROUTE
router.get('/:id/edit', async (req, res)=>{
    const cat = await Cats.findById(req.params.id);
    res.render('./cats/edit.ejs', {
        catId : req.params.id,
        cat : cat
    })
})
// UPDATE ROUTE
router.put('/:id', async (req, res) =>{
    try{
        const cats = await Cats.findByIdAndUpdate(req.params.id, req.body, {new: true});
        console.log(cats);
        res.redirect('/cats');
    }catch(err){
        res.send(err)
        console.log(cat)
        console.log(err)
    }
})
// DELETE ROUTE
router.delete('/:id', async (req, res) =>{
    const cat = await Cats.findByIdAndDelete(req.params.id);
    res.redirect('/cats');
})

module.exports = router;