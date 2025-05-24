import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import BASE_URL from "../config";


const Login=()=>{
    const navigate = useNavigate();


    const [email ,setEmail] = useState("");
    const [password ,setPassword] = useState("");
    const [role ,setRole] = useState("");
    const handleLogin =async()=>{
       
            if(email === ""){
                return alert("Enter Email")
            }
            if(password === ""){
                return alert("Please Enter Password")
            }
            if(role === ""){
                return alert("Select Role");
            }

            if(role == "Admin"){
                
                try {
                   let response = await axios.post(`${BASE_URL}/Admin/AdminLogin`,{email,password})
                    alert(response.data.msg);
                    console.log(response.data);
                    if(response.data.S){
                        localStorage.setItem("UserId",response.data.UserId)
                        localStorage.setItem("Name",response.data.name)
                        navigate("/Dashboard");
                    }
                } catch (error) {
                    console.log(error)
                }
            }else{
                try {
                    const response = await axios.post(`${BASE_URL}/User/UserLogin`,{email,password})
                    alert(response.data.msg);
                    console.log(response.data);
                    if(response.data.S){
                        localStorage.setItem("UserId",response.data.UserId)
                        localStorage.setItem("Name",response.data.name)
                        navigate("/UesrDashBoard");
                    }
                } catch (error) {
                    console.log(error)
                    alert("Server Error")
                }
            }
                
    }
  return(
    <>
        
        <div id="loginMainDiv">
            <div id="loginFormDiv">
                <h2 id="loginHeading">Login</h2>

                <div className="inputDiv">
                <label htmlFor="userid">Email</label><br />
                <input
                    type="text"
                    name="email"
                    id="userid"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="Enter user id here"
                />
                </div>

                <div className="inputDiv">
                <label htmlFor="password">Password</label><br />
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder="Enter password here"
                />
                </div>

                <div className="inputDiv">
                <label htmlFor="role">Select Role</label><br />
                <select name="role" id="role" value={role} onChange={(e)=>{setRole(e.target.value)}} >
                    <option value="">Option's</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                </div>

                <button onClick={handleLogin}>Login</button>
            </div>
        </div>

    </>
  )
}
export default Login