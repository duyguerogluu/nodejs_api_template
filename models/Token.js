const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    username: { type: String, required: true },
    token: { type: String, required: true },
    valid_time: { type: Date, required: true },
}, { collection: 'Token', usePushEach: true });

TokenSchema.statics = {
    async isTokenValid(username, input) {
        const token = this.findOne({ username: username, token: input });
        if (!token) {
            return false;
        }

        return Date.now() < token.valid_time
    }
}

module.exports = mongoose.model("Token", TokenSchema);