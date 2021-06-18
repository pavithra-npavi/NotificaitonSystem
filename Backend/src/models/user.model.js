
const mongoose = require("mongoose")

// MODEL CREATION
const userSchema = new mongoose.Schema({
    id: Number,
    InsitutionName:String,
    BranchName:String,
    Address:String,
    City:String,
    ContactNumber:Number,
    BranchIncharge:String,
    Pincodecovered:Number,
})


module.exports = mongoose.model("users",userSchema)

