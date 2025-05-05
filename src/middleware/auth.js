const authAdmin = (req, res, next) => {
    const token = "xyz" ;
    const abc = token === "xyz";
    if(!abc){
        res.status(400).send("unAutheried admin")
    } else {
        res.send("Hi i am admin");
        next()
        
    }
}

const userAuth = (req, res, next) => {
    const token = "xyz" ;
    const xyz = token === "xyz";
    if(!xyz){
        res.status(400).send("unAutheried admin")
    } else {
        console.log("useAdmin")
        next()
    }
}

module.exports = {
    authAdmin,
    userAuth
}