const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieParsar = require("cookie-parser");


app.use(express.json());
app.use(cookieParsar());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(400).send("Something went wrong");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Error fetching users");
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("Error fetching users");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("User Successfully Deleted");
//   } catch (err) {
//     res.status(400).send("Error fetching users");
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = [
//       "photoUrl",
//       "about",
//       "gender",
//       "age",
//       "skills",
//       "emailId",
//     ];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("User Successfully update");
//   } catch (err) {
//     res.status(400).send("UPDATE FAILED:" + err.message);
//   }
// });

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
