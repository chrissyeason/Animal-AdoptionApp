const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dogSchema = new Schema({
    name: String,
    breed: String,
    age: Number,
    gender: String,
    description: String,
    image: String
})

const Dog =  mongoose.model("Dog",dogSchema);
module.exports = Dog;