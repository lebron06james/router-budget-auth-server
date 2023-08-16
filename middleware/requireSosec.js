const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireSosec = async (req, res, next) => {

  console.log('Tinawag ako. Ako si requireSosec.');

  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");

    const _user = await User.findOne({ _id }).select("usertype");

    if (_user.usertype !== "SOSEC") {
      return res.status(401).json({ error: "You are not allowed to make this request." });
    }

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireSosec;