const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema ({
    name: String,
    age: Number,
    gender: String,
    description: String,
    image: String
})

const Cat = mongoose.model('cat', catSchema);
module.exports = Cat;