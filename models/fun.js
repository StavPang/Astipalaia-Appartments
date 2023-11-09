var mongoose = require("mongoose");
var funSchema = new mongoose.Schema(
    {
        title:String,
        location:String,
        phone:String,
        description:String
        
    })
    module.exports = mongoose.model("Fun", funSchema );