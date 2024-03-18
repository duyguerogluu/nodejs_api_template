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
const Product = require("../../models/Product");
const fs = require('fs');
const Utils = require('../helpers/utils')

const router = express.Router();

const dir = './upload/products';

router.get('/', async (req, res) => {
    try {
        const productList = await Product.find().limit(10);
        res.json(productList);
    } catch (e) {
        res.json(e);
    }
});

router.post('/', (req, res) => {

    //console.log(req.body, "body");
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        images: req.body.images,
    });
    product.save(); 
    res.json(product);
});

router.put('/images', (req, res) => {
    const input = req.body.images;

    // Girdi eger yoksa ya da liste degilse 403 dondur
    if (!input || !Array.isArray(input)) {
        return res.status(403).json({ 'error': 'Forbidden' })
    }

    try {
        // Klasor yoksa olustur
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        // Dosyanin olup olmama durumuna gore dosya adi belirle (dosya uzunlugu 64 karakter)
        function safeMakeID() {
            let filename = null

            do {
                const id = Utils.makeID(64)
                filename = `${dir}/${id}`
            } while (!fs.existsSync(filename))

            return filename;
        }

        // Gelen dosyalari kaydet
        var images = []
        for (let i = 0; i < input.length; i++) {
            // Dosya konumunu getir
            const filename = safeMakeID()

            // Base64 -> veri cevrimi
            const item = input[i].bytes
            const buff = Buffer.from(item, 'base64')
            const text = buff.toString('binary')

            // Dosyaya kaydet
            fs.writeFileSync(filename, text)

            // Resmin dosya yolunu parcalara ayir ve dosya adini listeye kaydet
            const routeWays = filename.split('/')
            images.push(routeWays[routeWays.length - 1])
        }

        return res.status(200).json({ images })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ 'error': e.toString() })
    }
});


router.get('/images/:imagesId', (req, res) => {
    try {
        const id = req.params.imagesId
        const filename = `${dir}/${id}`

        if (fs.existsSync(filename)) {
            const data = fs.readFileSync(filename)
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-disposition': `attachment;filename=${id}.jpg`,
                'Content-Length': data.length,
            })
            return res.end(Buffer.from(data, 'binary'))
        }

        return res.status(404).json({ 'error': 'Image not found' })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ 'error': e.toString() })
    }
});



router.get('/:productId', async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);
        res.json(product);
    } catch (e) {
        res.json(e);
    }
});


router.put('/:productId', (req, res) => {

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


router.delete('/:productId', (req, res) => {
    try{
       const deleteProduct = Product.findByIdAndDelete(req.params.productId);
       res.json(deleteProduct);
    }catch(e){
        res.json(e);
    }
});

module.exports = router;