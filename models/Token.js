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
const crypto = require('crypto');

const TokenSchema = mongoose.Schema({
    token: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    device_name: { type: String, required: true },
}, { collection: 'Token', usePushEach: true });

TokenSchema.statics = {
    async findTokensByUid(uid) {
        return this.find({ user: uid });
    },

    createAesCredentials() {
        const _aesKey = `3Ml4k4p12023_PRiV4T3`;
        const strArr = Array.from(_aesKey);
        const bsArr = strArr.map((e) => e.charCodeAt(0) >> 2).reverse().join('');
        const bsArr1 = Array.from(bsArr.slice(0, 10)).reverse().join('');
        const bsArr2 = bsArr.slice(10);

        const baseData1 = `E${bsArr1}${bsArr2}${bsArr1}A`;
        const baseData2 = `Eml${bsArr1}Api`;

        return [baseData1, baseData2];
    },

    async getValidatedToken(uid, token) {
        const foundToken = await this.findOne({ token: token });
        const credentials = this.createAesCredentials();

        try {
            const decipher = crypto.createDecipheriv('aes-256-cbc', credentials[0], credentials[1]);
            const upd = decipher.update(foundToken.token.toString(), 'base64', 'utf8') + decipher.final('utf8');
            return upd == uid ? foundToken : null;
        } catch(e) {}

        return null;
    },

    createTokenFromUserCredentials(uid) {
        const credentials = this.createAesCredentials();
        const cipher = crypto.createCipheriv('aes-256-cbc', credentials[0], credentials[1]);
        return (cipher.update(uid, 'utf8', 'base64') + cipher.final('base64'));
    },
};

module.exports = mongoose.model('Token', TokenSchema);
