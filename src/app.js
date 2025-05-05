const express = require("express");
const app = express()

const { authAdmin } = require("./middleware/auth");
const { userAuth } = require("./middleware/auth");


app.use("/admin", authAdmin);

app.get("/user", userAuth, (req, res) => {
    res.send("Hello, user!");
})

app.get("/admin/contact", (req, res) => {
    res.send("Hello, contact!");
})

app.get("/admin/getAllData", (req, res) => {
    res.send("Hello, getAllData!");
})
app.get("/user/login", (req, res) => {
    res.send("Hello, login!");
})

app.listen(4000, () => {
  console.log("Server Successfully response port no 4000");
});
