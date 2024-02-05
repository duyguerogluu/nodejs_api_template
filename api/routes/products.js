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
    err = await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.xwgcemn.mongodb.net/${process.env.DATABASE_NAME1}?retryWrites=true&w=majority`);
}


connect_to_db()


router.get('/', async (req, res, next) => {
    try {
        const productList = await Product.find().limit(10);
        res.json(productList);
    } catch (e) {
        res.json(e);
    }
});

router.post('/', (req, res, next) => {
    //console.log(req.body, "body");
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    });
    product.save(); //db save
    //res.status(200).json({message: 'Products create ekranında POST requesti çalıştı.'});
    res.json(product);
});


router.get('/:productId', async (req, res, next) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);
        res.json(product);
    } catch (e) {
        res.json(e);
    }
});


router.put('/:productId', (req, res, next) => {

    try{
        const updateProduct = Product.findByIdAndUpdate(req.params.productId, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        });
        res.json(updateProduct);
    }catch(e){
        res.json(e);
    }
});


router.delete('/:productId', (req, res, next) => {
    try{
       const deleteProduct = Product.findByIdAndDelete(req.params.productId);
       res.json(deleteProduct);
    }catch(e){
        res.json(e);
    }
});

module.exports = router;