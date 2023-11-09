var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    title: String,
    userid: String
});

module.exports = mongoose.model("Comment", commentSchema);