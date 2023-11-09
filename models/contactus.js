var mongoose = require("mongoose");
var ContactusSchema = new mongoose.Schema({
    name:String,
    email:String,
    message:String
});
module.exports = mongoose.model("Contactus", ContactusSchema)