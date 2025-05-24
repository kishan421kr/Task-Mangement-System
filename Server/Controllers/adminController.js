
const AddEmployeeModel = require("../Models/AddEmployeeModel");
const AdminloginModel = require("../Models/adminLoginModel");
const TaskModel = require("../Models/TaskModel");


const AdminLogin = async(req,res)=>{
    const { email, password } =req.body
    try {
        const data = await AdminloginModel.findOne({AdminEmail:email});
        console.log(data);
        if(!data){
            return res.send({msg:"No Admin Found",S:0});
        }
        if(data.password != password){
            return res.send({msg:"Wrong Password",S:0})
        }
        res.send({msg:"Successfully Admin login",S:1,UserId:data._id,name:email})
    } catch (error) {
        
    }
    
}
const AddEmployee=async(req, res)=>{
    const {
        employeeName,
        employeeEmail, 
        employeeRole,
        employeePassword} = req.body;

    try {
        await AddEmployeeModel.create({
            EmployeeName:employeeName,
            EmployeeEmail:employeeEmail,
            EmployeeRole:employeeRole,
            EmployeePassword:employeePassword
        })
        res.send("Employee Successfully Added");
    } catch (error) {
            console.log(error)
            res.send("Server error");
    }
    
}

const UserData=async(req,res)=>{
    
    const data = await AddEmployeeModel.find().select("-EmployeePassword");
    // console.log(data);
    res.send(data);
}
const AddTask=async(req,res)=>{
    const { Title, description, date,userId }=req.body;
    console.log(req.body);
   try {
        await TaskModel.create({
        title:Title,
        description:description,
        duration:date,
        EmployeeId:userId,
    })
    res.send("Task Assigned");
   } catch (error) {
        console.log(error)
        res.send("Backend Error")
   }
    
}

const TaskStatus=async(req,res)=>{
    try {
         const data = await TaskModel.find().populate("EmployeeId");
        res.send(data);
    } catch (error) {
        console.log(error)
    }
   
}

const GetEmployee=async(req, res)=>{
    try {
        const data = await AddEmployeeModel.find();
        res.send(data);
    } catch (error) {
        
    }
}

const ReassignTask=async(req,res)=>{
    const {newStatus,_id ,title,description,duration}=req.body;

    try {
        await TaskModel.findByIdAndUpdate({_id:_id},{status:newStatus,title:title,description:description,duration:duration})
        res.send("Task Re-assigned");
    } catch (error) {
        res.send("internal server error");
    }
    
}
const DeleteTask=async(req,res)=>{
    const {TaskId} = req.body;
    try {
        await TaskModel.findByIdAndDelete(TaskId);
        res.send("Task Deleted");
    } catch (error) {
        res.send("Internal server error");
    }
    
}

const RemoveEmployee=async(req,res)=>{
    const {EmployeeId} = req.body;

    try {
        await AddEmployeeModel.findByIdAndDelete(EmployeeId);
        await TaskModel.deleteMany({EmployeeId:EmployeeId})
        res.send("Employee Removed");
    } catch (error) {
        res.send("Internal server error");
    }

}

module.exports={
    AdminLogin,
    AddEmployee,
    UserData,
    AddTask,
    TaskStatus,
    GetEmployee,
    ReassignTask,
    DeleteTask,
    RemoveEmployee
};