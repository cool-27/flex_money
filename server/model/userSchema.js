const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   
   name: {
        type: String,
        required: true
    },
  
    phone: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
   
})






const User = mongoose.model('USER', userSchema)

module.exports = User