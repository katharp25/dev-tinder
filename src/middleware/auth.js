const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid !");
    }
    const decodedObj = await jwt.verify(token, "pk25/11/1994");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    console.log(user);
    if (!user) {
      throw new Error("User is not valid !");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
};

module.exports = {
  userAuth,
};
