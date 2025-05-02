const express = require("express");

const app = express ();

app.use("/", (req, res)=>{
     res.send("Hello ==>")
} );

app.use("/hello",(req,res)=>{
    res.send(" Hello is here");
});

app.use("/test",(req,res)=>{
    res.send("I am from test");
})

app.listen(3000, () => {
    console.log("Server Successfully response port no 3000");
})