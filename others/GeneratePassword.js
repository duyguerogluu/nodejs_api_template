const bcrypt = require('bcrypt');
require("dotenv/config");
var args = process.argv.slice(2).join(' ');
var salt = process.env.JWT_SALT;
console.log(bcrypt.hashSync(args, salt));
