const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema ({
    name: String,
    age: Number,
    gender: String,
    description: String,
    img: 
        { data: Buffer, contentType: String }
})

const Cat = mongoose.model('cat', catSchema);
module.exports = Cat;