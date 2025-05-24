

const express = require("express");
const route = express.Router();
const AdminController = require("../Controllers/adminController");

route.post("/AdminLogin",AdminController.AdminLogin);
route.post("/AddEmployee",AdminController.AddEmployee);
route.get("/UserData",AdminController.UserData);
route.post("/AddTask",AdminController.AddTask);
route.get("/TaskStatus",AdminController.TaskStatus);
route.get("/EmployeesDetail",AdminController.GetEmployee);
route.post("/ReassignTask",AdminController.ReassignTask);
route.post("/DeleteTask",AdminController.DeleteTask);
route.post("/RemoveEmployee",AdminController.RemoveEmployee);
module.exports =route