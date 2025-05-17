const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "famale", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://en.wikipedia.org/wiki/File:Person_%281102860%29_-_The_Noun_Project.svg",
    },
    about: {
      type: String,
      default: "Hi i am default value ",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema); //exporting the schema as a model
