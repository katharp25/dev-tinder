const expires = require("express");
const requestRouter = expires.Router();
const { userAuth } = require("../middleware/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  console.log("Sending a Connection request");

  res.send(`${user.firstName} req sended`);
});

module.exports = requestRouter;
