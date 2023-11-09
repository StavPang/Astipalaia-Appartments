var mongoose = require("mongoose");
var hotelSchema = new mongoose.Schema(
    {
        title:String,
        location:String,
        phone:String,
        description:String
        
    })
    module.exports = mongoose.model("Hotel", hotelSchema );