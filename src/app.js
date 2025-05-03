const express = require("express");

const app = express ();


app.get("/user",(req,res) => {
    console.log(req.query);
    res.send({FN:"pk", LN:"KK"});
});

app.get("/user/:userId",(req,res) => {
    console.log(req.params)
    res.send({userid: 1, fn: "pp"});
})

app.get("/rount",(req,res,next) => {
    console.log("rount 1");
    // res.send("rount 1 through Response")
    next()
},(req,res,next) => {
    console.log("round 2");
    // res.send("rount 2 through Response")
    next()
},(req,res,next) => {
    console.log("round 3");
    res.send("rount 3 through Response")
},(req,res) => {
    console.log("round 4")
    res.send("rount 4 through Response")
})

app.listen(4000, () => {
    console.log("Server Successfully response port no 4000");
})