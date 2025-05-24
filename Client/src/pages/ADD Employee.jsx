import { useState } from "react"
import "../CSS/addemp.css"
import axios from "axios"
import BASE_URL from "../config"
const AddEmp=()=>{
    const [input ,setInput] = useState({
        employeeName:"",
        employeeEmail:"",
        employeeRole:"",
        employeePassword:""
    })

    const handleInput=(e)=>{
        let value = e.target.value;
        let name = e.target.name;

        setInput((key)=>({...key,[name]:value}));
        console.log(input);
    }
    const handleAddEmp=async()=>{
        try {

            if(input.employeeRole == ""){
            alert("Select Employee Role");
            }
            if(input.employeeName == "" || input.employeeEmail == "" || input.employeePassword == ""){
                alert("All Inputs required")
            }

            const response = await axios.post(`${BASE_URL}/Admin/AddEmployee`,input)
            alert(response.data);
            setInput({ 
                employeeName:"",
                employeeEmail:"",
                employeeRole:"",
                employeePassword:""}
            )
        } catch (error) {
            console.log(error);
            alert("Server error");
        }
        
    
    }

    return(
        <>
            <div className="formContainer">
                <div className="formGroup">
                    <label htmlFor="employeeName">Employee Name</label>
                    <input 
                    type="text" 
                    id="employeeName" 
                    name="employeeName" 
                    value={input.employeeName}
                    onChange={handleInput}
                    placeholder="Enter name here" />
                </div>

                <div className="formGroup">
                    <label htmlFor="employeeEmail">Employee Email</label>
                    <input 
                    type="email" 
                    id="employeeEmail" 
                    name="employeeEmail" 
                    value={input.employeeEmail}
                    onChange={handleInput}
                    placeholder="Enter email here" />
                </div>

                <div className="formGroup">
                    <label htmlFor="employeeRole">Employee Role</label>
                    <select 
                    id="employeeRole" 
                    name="employeeRole"
                    value={input.employeeRole}
                    onChange={handleInput}>
                        <option value="">Select Role</option>
                        <option value="manager">Manager</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                    </select>
                </div>

                <div className="formGroup">
                    <label htmlFor="employeePassword">Employee Password</label>
                    <input 
                    type="password" 
                    id="employeePassword" 
                    name="employeePassword" 
                    value={input.employeePassword}
                    onChange={handleInput}
                    placeholder="Enter password here" />
                </div>

                <button className="submitBtn" onClick={handleAddEmp}>Submit</button>
            </div>


        </>
    )
}
export default AddEmp