var mongoose = require("mongoose");
var foodSchema = new mongoose.Schema(
    {
        title:String,
        location:String,
        phone:String,
        description:String
        
    })
    module.exports = mongoose.model("Food", foodSchema );