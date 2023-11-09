var mongoose = require("mongoose");
var compleventSchema = new mongoose.Schema(
    {
        title:String,
        location:String,
        price:Number,
        adress:String,
        datetime:String,
        description:String
    })
    module.exports = mongoose.model("ComplEvent", compleventSchema);