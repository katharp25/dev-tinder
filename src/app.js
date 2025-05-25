const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieParsar = require("cookie-parser");


app.use(express.json());
app.use(cookieParsar());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(4000, () => {
      console.log("Server Successfully response port no 4000");
    });
  })
  .catch((err) => {
    console.log("Database is not connected");
  });
