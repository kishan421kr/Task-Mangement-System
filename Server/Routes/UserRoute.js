

const express = require("express");
const route = express.Router();
const userController = require("../Controllers/userController");

route.post("/UserLogin",userController.Login);
route.post("/GetTask",userController.GetTask);
route.post("/ChangeStatus",userController.ChangeStatus)
module.exports =route