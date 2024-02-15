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
const User = require('../../models/Advert');
const router = express.Router();

const connect_to_db = async () => {
    //console.log(process.env.USER_NAME);
    err = await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.xwgcemn.mongodb.net/${process.env.DATABASE_NAME1}?retryWrites=true&w=majority`);
}

connect_to_db()

router.get('/advert', async (req, res, next)=>{
    try{
        const advertList = await Advert.find().limit(30);
        res.json(advertList);
    }catch (e){
         res.json(e);
    }
})


router.post('/advert', (req, res, next) => {
    //console.log(req.body, "body");
    const advert = new Advert({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        images: req.body.images,
        price: req.body.price,
        advert_type: req.body.advert_type,
        rooms: req.body.rooms,
    });
    advert.save();
    res.json(advert);
});

router.get('/:advertId', async (req, res, next) => {
    try {
        const id = req.params.advertId;
        const advert = await Advert.findById(id);
        res.json(advert);
    } catch (e) {
        res.json(e);
    }
});

router.put('/:advertId', (req, res, next) => {

    try{
        const updateAdvert = Advert.findByIdAndUpdate(req.params.advertId, {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            images: req.body.images,
            price: req.body.price,
            advert_type: req.body.advert_type,
            rooms: req.body.rooms,
        });
        res.json(updateAdvert);
    }catch(e){
        res.json(e);
    }
});

router.delete('/:advertId', (req, res, next) => {
    try{
       const deleteAdvert = User.findByIdAndDelete(req.params.advertId);
       res.json(deleteAdvert);
    }catch(e){
        res.json(e);
    }
});

module.exports = router;