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

const mongoose = require('mongoose');

const ProductShcema = new mongoose.Schema({
    title: {type:String, required:true},
    description: { type: String, default: null },
    price: {
        amount: { type: Number, required: true },
        currency: { type: String, default: 'TRY' },
    },
    images: [ { type: String, required: true } ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    status: { type: Number, enum: [0, 1, 2], default: 0 },
    
}, { collection: 'Product', usePushEach: true });

/** @class Product */
module.exports = mongoose.model("Product", ProductShcema);