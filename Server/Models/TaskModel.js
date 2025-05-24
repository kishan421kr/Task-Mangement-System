
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title:String,
    description:String,
    duration:Number,
    status:{
        type:String,
        default:"Pending",
    },
    EmployeeId:{
        type:mongoose.Types.ObjectId,
        ref:"Employee"
    }
})

module.exports = mongoose.model("Task",TaskSchema);