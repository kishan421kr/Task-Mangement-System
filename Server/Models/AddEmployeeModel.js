const mongoose = require("mongoose");

const AddEmployeeSchema = new mongoose.Schema({
    EmployeeName:String,
    EmployeeEmail:String,
    EmployeeRole:String,
    EmployeePassword:String
})

module.exports = mongoose.model("Employee" , AddEmployeeSchema)