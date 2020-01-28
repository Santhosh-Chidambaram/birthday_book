const mongoose = require("mongoose");

const BirthdaysSchema = mongoose.Schema({
    
   user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    
  },
  phone_num: {
    type: String,
    required: true
  },
  preference:{
      type:String,
      default:'friend'
  },
  birthday:{
      type:String,
      required:true
  },
  date: {
    type: Date,
    default:Date.now
  }
});

module.exports = mongoose.model('birthdays', BirthdaysSchema);
