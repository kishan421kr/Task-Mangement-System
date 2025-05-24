
const AddEmployeeModel = require("../Models/AddEmployeeModel");
const TaskModel = require("../Models/TaskModel");


const Login=async(req,res)=>{
    const { email, password } =req.body
        try {
            const data = await AddEmployeeModel.findOne({EmployeeEmail:email});
            console.log(data.EmployeeName);
            if(!data){
                return res.send({msg:"No User Found",S:0});
            }
            if(data.EmployeePassword != password){
                return res.send({msg:"Wrong Password",S:0})
            }
            res.send({msg:"Successfully User login",S:1,UserId:data._id,name:data.EmployeeName})
        } catch (error) {
            
        }
}
const GetTask=async(req,res)=>{
    // const data = await TaskModel.find()
    const {EmpId} = req.body;
    try {
        const data = await TaskModel.find({EmployeeId:EmpId})
    // console.log(data);

    res.send(data);
    } catch (error) {
        console.log(error);
    }
    
}

const ChangeStatus=async(req,res)=>{
    const{TaskId ,statusChange}=req.body;
    try {
        const update =await TaskModel.findByIdAndUpdate({_id:TaskId},{status:statusChange})
    if(!update){
        res.send({msg:"Task Not found"})
    }

    res.send("Task Updated");
    } catch (error) {
        console.log(error)
        res.send({msg:"internal server error"})
    }
}

module.exports = {
    Login,
    GetTask,
    ChangeStatus
}