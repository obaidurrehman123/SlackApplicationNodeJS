const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded && decoded.id) {
        res.status(401).json({ error: "You are unauthorized to make this request" });
        return;
      }

      req.user = await User.findByPk(decoded.id);

      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" }); // Handle the case of an invalid token
    }
  } else {
    res.status(401).json({ error: "No token found" }); // Handle the case of a missing token
  }
};

module.exports = { protect };
