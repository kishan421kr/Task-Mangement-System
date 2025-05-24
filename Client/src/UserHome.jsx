import axios from "axios";
import { useEffect, useState } from "react"
import BASE_URL from "./config";
import "./CSS/userHome.css"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Navigate, useNavigate } from "react-router-dom";

import UserFooter from "./components/userFooter";
const UserHome=()=>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data ,setData] =useState([]);
    let name = localStorage.getItem("Name")
    const getdata=async()=>{
        const EmpId = localStorage.getItem("UserId");
        try {
            const response = await axios.post(`${BASE_URL}/User/GetTask`,{EmpId:EmpId})
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            alert("server error to get the data");
        }
        
    }
    const [statusChange,setStatusChange] = useState("");
    const [TaskId ,setTaskId] = useState("");

    const handleStatus=(TaskId)=>{
        setTaskId(TaskId)
        handleShow()
    }
    const handleFinallCall=async()=>{
        
        try {
            await axios.post(`${BASE_URL}/User/ChangeStatus`,{TaskId:TaskId,statusChange:statusChange})
            alert("Status Updated");
            getdata()
            handleClose()
        } catch (error) {
            
        }

    }
    const navigate = useNavigate()

    let sr=0;
    useEffect(()=>{
        getdata()
    },[])
    return(
        <>
        <div id="UserHomeMainDiv">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 50px"}}>
                <h3>Employee:{name}</h3><button style={{width:"80px"}} onClick={()=>{navigate("/"),localStorage.clear()}}>Logout</button>
            </div>
            
            <h2>Your Task</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Sr.no</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Current Status</th>
                    <th>Change Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((key)=>{
                        sr++;
                    return(
                        <>
                            <tr>
                                <td>{sr}</td>
                                <td>{key.title}</td>
                                <td>{key.description}</td>
                                <td>{key.duration}day</td>
                                <td>{key.status}</td>
                                <td><select name="" id="" onChange={(e)=>{setStatusChange(e.target.value),handleStatus(key._id)}}>
                                        <option value="">Select Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        </>
                    )
                })}
                </tbody>
            </Table>
            
        </div>
        <UserFooter/>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Changing Task Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you really Want to change the Task Status</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFinallCall}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
        
        </>
    )
}
export default UserHome