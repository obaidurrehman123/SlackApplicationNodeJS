const jwt = require("jsonwebtoken");

//  Boilerplate code for generating code

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
module.exports = generateToken;
