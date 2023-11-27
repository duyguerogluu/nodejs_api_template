const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const dbName = "personalTrainer";
const username = "erogluduygu";
const password = "aLT7BnJe5ubB7fqo";

err = mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.xwgcemn.mongodb.net/${dbName}?retryWrites=true&w=majority`);
console.log(err);


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