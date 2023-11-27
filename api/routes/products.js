const express = require('express');
const mongoose = require('mongoose');
require("dotenv/config");
const router = express.Router();



const connect_to_db = async () => {
    err = await mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xwgcemn.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`);
    console.log(err);   
}

connect_to_db()

router.get('/', (req,res,next)=> {
    //res.status(200).json({message: 'Products ekranında GET requesti çalıştı.'});
    res.send("products");
});

router.post('/', (req,res,next)=> {
    res.status(200).json({message: 'Products ekranında POST requesti çalıştı.'});
});

router.get('/:productId', (req, res, next)=> {
    const id = req.params.productId;
    if(id === 'duygu'){
        res.status(200).json({
            message: 'Hoşgeldin', 
            id: id,
        });
    }
    else{
        res.status(200).json({})
    }
});

const products = [
    {
        id: "string",
        title:"string",
        description: "string",
        prices: "number"
    }
];

//fetch products //get
//get product //:id //get
//create product //post
//update product //:id //put
//delete product //:id //delete


module.exports = router;