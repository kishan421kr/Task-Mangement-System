import { Link, Outlet, useNavigate } from "react-router-dom"

import "../CSS/AdminDash.css"

const Dashboard=()=>{
  const navigate = useNavigate();
  const name = localStorage.getItem("Name");
  return(
    <>
        <div id="DashMainDiv">
            <h3 id="DashHeading" style={{textAlign:"center"}}>Welcome To Admin Dashboard</h3>
            <div id="FirstNav">
              <div>Admin:{name}</div>
              <button onClick={()=>{localStorage.clear(),navigate("/")}}>Logout</button>
            </div>
            <div id="secondNav">
                <Link className="SecondNavLink" to={"addemp"}>ADD Employee</Link>
                <Link className="SecondNavLink" to={"addTask"}>Assign Task</Link>
                <Link className="SecondNavLink" to={"status"}>Task Status</Link>
                <Link className="SecondNavLink" to={"manageEmp"}>Manage Employee</Link>
            </div>
            <div style={{padding:"20px"}}>
                <Outlet/>
            </div>
        </div>
    </>
  )
}
export default Dashboard