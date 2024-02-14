const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
try{

    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err)=>{
            if(err){
                console.error(err.messaage);
                res.redirect("/login");
            }else{
                next();
            }
        })
    }else{
        res.redirect("/login");
    }

    // const authHeader = req.headers["authorization"]
    // console.log("authHeader: ", authHeader);

    // const token = authHeader && authHeader.split(" ")[1];
    // console.log("token: ", token);

    // if(!token) {
    //     return res.status(401).json({
    //         succeeded: false,
    //         error: "No token avaible",

    //     });
    // }

    // req.user = await User.findById(
    //     jwt.verify(token, process.env.JWT_SECRET).userId
    // );

    // next();
}catch(error){
  res.status(401).json({
    succeeded:false,
    error: "No token avaible",
  })
}


    
}

export {authenticateToken};