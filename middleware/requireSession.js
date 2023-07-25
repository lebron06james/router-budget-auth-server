const jwt = require("jsonwebtoken");

// middleware to test if authenticated and add timestamp
const checkIsAuthAndAddTimestamp = async (req, res, next) => {
    if (req.session.isAuth) {
      req.session.timestamps.push(new Date().getTime());
      next();
    } else {
      res.status(401).json({ error: "Request is not authorized" });
    }
  };

  
module.exports = checkIsAuthAndAddTimestamp;
