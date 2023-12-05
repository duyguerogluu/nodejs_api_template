/*
 *  This file is part of nodejs_api_template.
 *
 *  nodejs_api_template is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  nodejs_api_template is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *   along with nodejs_api_template.  If not, see <https://www.gnu.org/licenses/>.
 */

const express = require('express');
const mongoose = require('mongoose');
require("dotenv/config");
const Product = require("../../models/Product");

const router = express.Router();

const connect_to_db = async () => {
    //console.log(process.env.USER_NAME);
    err = await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.xwgcemn.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`);
}


connect_to_db()


router.get('/', (req,res,next)=> {
    //res.status(200).json({message: 'Products ekranında GET requesti çalıştı.'});
    res.send("fetch products list");
});

router.post('/', (req,res,next)=> {
    //console.log(req.body, "body");
    const product = new Product({
        name: req.body.product,
        price: req.body.price,
        description: req.body.description,
    });
    product.save(); //db save
    //res.status(200).json({message: 'Products create ekranında POST requesti çalıştı.'});
    res.json(product);
});


router.get('/:productId', (req, res, next)=> {
   
    res.send(`fetch product ${req.params.productId}`);

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


router.put('/:productId', (req, res, next)=> {
    res.send(`update product ${req.params.productId}`);
});


router.delete('/:productId', (req,res,next)=>{
    res.send(`delete product ${req.params.productId}`);
});


const products = [
    {
        id: 1,
        title:"Product 1",
        prices: 100,
        description: "Product1 description",
    }
];

//fetch products //get
//get product //:id //get
//create product //post
//update product //:id //put
//delete product //:id //delete


module.exports = router;