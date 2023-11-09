var mongoose = require("mongoose");
var campSchema = new mongoose.Schema(
    {
        title:String,
        location:String,
        phone:String,
        description:String
        
    })
    module.exports = mongoose.model("Camp", campSchema );