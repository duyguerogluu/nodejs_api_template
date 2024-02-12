const TokenSchema = require('../../models/Token');
const router = require('express').Router();
const User = require('../../models/User');
import bcrypt from 'bcrypt';

router.post('/login', async (req, res, next) => {
    try{

    const user = await User.findOne({username: req.body.username});

    console.log("req.body", req.body);

    let same = false

    if(user){
        same = await bcrypt.compare(req.body.password, user.password);
        console.log("same", same);
    }else {
        res.status(401).json({
            succeded: false,
            error: "There is no such user.",
        });
    } 
    
    if(same){
        res.status(200).send("You are logged in ");
        console.log("same", same);
    }else {
        res.status(401).json({
            succeded: false,
            error: "Password are not macthed.",
        });
    } 

}catch(error){
        res.status(500).json({
            succeded: false,
            error,
        })
    }});


router.get('/signup', (req, res, next) => {})
router.post('/signup', (req, res, next) => {})
router.get('/logout', (req, res, next) => {})

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
