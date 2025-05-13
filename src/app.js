const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express()

app.use(express.json());

app.post("/signup",async(req,res) => {
    
    
    
    const user = new User(req.body);
    
    
    //Creating a new instance of the User model

    // const user = new User({
    //      firstName : "nana",
    //      lastName : "patekar",
    //      emailId : "nana@gmail.com",
    //      password : "nana123",
    // });

    try{
        await user.save();
        res.send("User Added successfully");
    } catch (err){
        res.status(400).send("Error saving the user:" + err.message);
    }
})



connectDB()
.then(() =>{
    console.log("Database connected");
    app.listen(4000, () => {
        console.log("Server Successfully response port no 4000");
      });
})
.catch((err) => {
    console.log("Database is not connected");
})



