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

const mongoose = require('mongoose');


const PhotoSchema = mongoose.Schema({
    path: { type: String, required: true },
    type: {
        type: String,
        enum: ['advert', 'profile', 'other'],
        default: 'other',
    },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now() },
}, { collection: 'Photo', usePushEach: true });

module.exports = mongoose.model("Photo", PhotoSchema);