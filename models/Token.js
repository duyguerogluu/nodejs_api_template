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

const TokenSchema = new mongoose.Schema({
    username: { type: String, required: true },
    token: { type: String, required: true },
    valid_time: { type: Date, required: true },
}, { collection: 'Token', usePushEach: true });

TokenSchema.statics = {
    /** @memberOf Token */
    async getUserByToken(token) {
        const tokenObj = this.findOne({ token })
        if (tokenObj) {
            return User.findOne({ username: tokenObj.username })
        }

        return undefined
    },

    /** @memberOf Token */
    async isTokenValid(username, input) {
        const token = this.findOne({ username: username, token: input });
        if (!token) {
            return false;
        }

        return Date.now() < token.valid_time
    }
}

/** @class Token */
module.exports = mongoose.model("Token", TokenSchema);