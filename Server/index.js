
const express = require("express")
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

const AdminRoute = require("./Routes/adminRoute");
const UserRoute = require("./Routes/UserRoute");

require("dotenv").config();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URl).then(
    ()=>{
    console.log("DB connected")
}
)

app.use("/User",UserRoute)
app.use("/Admin",AdminRoute);

const port = 3000 || 5000;
app.listen(port,()=>{
    console.log(`server runing on ${port} `)
})