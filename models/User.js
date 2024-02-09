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
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const mongoose = require('mongoose');

const PhoneSchema = mongoose.Schema({
    phone: { type: Number, required: true },
    country_code: { type: Number, required: true },
    verified: { type: Date, default: Date.now() },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    _id: false,
    id: false,
});

const EMailSchema = mongoose.Schema({
    email: { type: String, required: true },
    verified: { type: Date, default: Date.now() },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    _id: false,
    id: false,
});

const UserSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() },
    adverts: [ { type: mongoose.Types.ObjectId, ref: 'Advert' } ],
    phone: { type: PhoneSchema },
    email: { type: EMailSchema },
}, { collection: 'User', usePushEach: true });

UserSchema.statics = {
    async getUserById(id) {
        return this.findOne({ _id: id })
            .populate([
                {
                    path: 'adverts'
                }
            ]);
    },
}
UserShcema.pre("save", function(next){
      const user = this;
      console.log("USER PASS 1",user.password);
      bcrypt.hash(user.password, 10, (err, data) => {
        user.password = hash;
        console.log("USER PASS 2",user.password);
        next();
      })
});



 module.exports = mongoose.model("User", UserShcema);