const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pradipkathar25:rqZFpijOA0rNQQ6w@devtinder.lfz2ei7.mongodb.net/devtinder"
  );
};

module.exports ={
    connectDB
}

// connectDB()
//   .then(() =>{
//     console.log("connected to database");
//   })
//   .catch((error) => {
//       console.log("Database is not be connected");
//   })
