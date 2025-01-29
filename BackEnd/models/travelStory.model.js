const mongoose = require("mongoose");//importing the mongoose package
const Schema = mongoose.Schema;//importing the schema from mongoose

const travelStorySchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    visitedLocations: { type: [String], default: [] },
    isFavaourite: { type: Boolean, default: false },
    
    createdOn:{typr:Date,default:Date.now},


})