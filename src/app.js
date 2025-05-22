const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const cookieParsar = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParsar());

app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // const isValidPassword = await bcrypt.compare(password, user.password);
       const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {
      //Create a JWT Token
      
      // const token = await jwt.sign({ _id: user._id }, "pk25/11/1994", {expiresIn: "7d"});
         const token = await user.getJWT();

      res.cookie("token", token, {
        expires : new Date(Date.now() + 8 * 24 * 60 * 60 * 100),    // 8 days expires cookie
      });
      res.send("Login Succesfully!!!");
    } else {
      throw new Error(" Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try { 
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.post("/sendConnectionRequest",userAuth, async (req,res) =>{

     const user = req.user;

    console.log("Sending a Connection request")
    
    res.send(`${user.firstName} req sended`)

})




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
