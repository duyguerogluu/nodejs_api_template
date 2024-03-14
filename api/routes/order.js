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

const Order = require("../../models/Order");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const orderList = await Order.find().limit(10);
        res.json(orderList);
    } catch (e) {
        res.json(e);
    }
});


router.post('/', (req, res) => {
    //console.log(req.body, "body");
    const product = new Order({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
    });
    product.save();
    res.json(product);
});



module.exports = router;