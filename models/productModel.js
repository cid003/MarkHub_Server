//import these:
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//this declares a mongoose schema. these are
//the values that mongoDB will store in the database.
var ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    tags:{
        type: [],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);