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
const User = require('./User');
const Product = require('./Product');

const OrderSchema = new mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'User' },
    product: [ { type: mongoose.Types.ObjectId, ref: 'Product' } ],
    price: {
        amount: { type: Number, required: true },
        currency: { type: String, default: 'TRY' },
    },
    created: { type: Date, default: Date.now() },
    modified: { type: Date, default: Date.now() },

    /* Order status
     *
     * 0 - sepette
     * 1 - sipariş alındı
     * 2 - sipariş yolda
     * 3 - sipariş teslim edildi
     * 4 - sipariş iadeye gönderildi
     * 5 - sipariş iadeye kabul edildi
     * 6 - iadeden sipariş geri gönderildi
     * 7 - iade teslim edildi
     */
    status: { type: Number, enum: [0, 1, 2, 3, 4, 5, 6, 7], default: 0 },
    status_changer: {
        author: { type: mongoose.Types.ObjectId, ref: 'User' },
        reason: { type: String, default: null },
        changed: { type: Date, required: true },
    },
}, { collection: 'Order', usePushEach: true });

OrderSchema.statics = {
    /** @memberOf Order */
    async removeOrderById(id) {
        return this.deleteOne({ _id: id });
    },

    /** @memberOf Order */
    async cancelOrder(id, changerId) {
        return this.findByIdAndUpdate(id, {
            status: 4,
            status_changer: {
                author: changerId,
                reason: 'Iptal',
                changed: Date.now(),
            },
        });
    },

    /** @memberOf Order */
    async findOrdersByUid(uid) {
        return this.find({ author: uid })
            .populate([
                {
                    path: 'author',
                },
                {
                    path: 'status_changer',
                    populate: [
                        {
                            path: 'author',
                        }
                    ],
                },
                {
                    path: 'images',
                },
            ]);
    },
};

/** @class Order */
module.exports = mongoose.model('Order', OrderSchema);
