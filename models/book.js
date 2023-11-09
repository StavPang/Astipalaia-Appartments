const mongoose = require("mongoose");
const seatSchema = new mongoose.Schema({
    row: {
      type: String,
      required: true
    },
    seat: {
      type: String,
      required: true
    }
  });
const bookSchema = new mongoose.Schema(
    {
        name1:String,
        phone1:String,
        name2:String,
        phone2:String,
        name:String,
        phone:String,
        name3:String,
        phone3:String,
        userid:String,
        cardnum:String,
        cardtype:String,
        total:String,
        title:String,
        datetime: String,
        seats: [seatSchema]
       
        }
        );
    
    module.exports = mongoose.model("Book", bookSchema);
