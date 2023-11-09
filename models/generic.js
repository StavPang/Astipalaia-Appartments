var mongoose = require("mongoose");
var genericSchema = new mongoose.Schema(
    {
        title:String,
        text1:String,
        text2:String,
        text3:String,
        text4:String,
        text5:String,
        text6:String
    })
    module.exports = mongoose.model("Generic" , genericSchema);
