const mongoose = require("mongoose");//importing the mongoose package
const userModel = require("./user.model");
const Schema = mongoose.Schema;//importing the schema from mongoose

const travelStorySchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    visitedLocations: { type: [String], default: [] },
    isFavaourite: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User",required: true },
    createdOn: { type: Date, default: Date.now },
    Image: { type: String, required: true },
    visitedDate: { type: Date, required: true },

});

module.exports = mongoose.model("TravelStory", travelStorySchema);//exporting the user model