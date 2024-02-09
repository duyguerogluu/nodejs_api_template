const TokenSchema = require('../../models/Token');

const AuthUtils = (() => {
    const checkJWT = async (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        const uidHeader = req.headers['x-uid'];

        if (bearerHeader.indexOf('Bearer') === 0) {
            const split = bearerHeader.split(' ');
            if (split.length === 2) {
                const token = split[1].trim();
                const validated_token = await TokenSchema.getValidatedToken(uidHeader, token);

                if (validated_token) {
                    req.token = validated_token;
                    return next();
                }
            }
        }

        return res.status(401).json({ error: 'Unauthorized' });
    }

    return {
        checkJWT,
    };
})();

module.exports = AuthUtils;
