const mongoose = require("mongoose");//importing the mongoose package
const Schema = mongoose.Schema;//importing the schema from mongoose

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});//creating the user schema

module.exports = mongoose.model("User", userSchema);//exporting the user model
