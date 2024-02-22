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