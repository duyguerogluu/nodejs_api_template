const mongoose = require('mongoose');

const ProductShcema = new mongoose.Schema({
    name: {type:String, required:true},
    price: {type: Number, required: true},
    description: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Product", ProductShcema);