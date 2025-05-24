const mongoose = require("mongoose");

const AdminLoginSchema = new mongoose.Schema({
    AdminEmail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        length:6,
        required:true
    }

})

module.exports = mongoose.model("AdminLogin",AdminLoginSchema)