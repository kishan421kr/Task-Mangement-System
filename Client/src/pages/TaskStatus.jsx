
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import BASE_URL from '../config';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
const Status=()=>{

    const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => {setShow(true) };

      const [show2, setShow2] = useState(false);
      
          const handleClose2 = () => setShow2(false);
          const handleShow2 = () => setShow2(true);
    const [data ,setData] = useState([])

    const getdata =async()=>{
        const response = await axios.get(`${BASE_URL}/Admin/TaskStatus`)
        setData(response.data);
        console.log(response.data);
    }

    const handleReAssigmnet=(TaskID)=>{
        console.log(TaskID);
        setTaskInput(TaskID)
        handleShow()

    }
    const [TaskInput ,setTaskInput] = useState({
        title:"",
        description:"",
        duration:""
    })
      const handleTaskInput=(e)=>{
          let value = e.target.value;
          let name = e.target.name;
          setTaskInput((key)=>({...key,[name]:value}));
          console.log(TaskInput);
    
      }
    
      const handleTaskSubmit=async()=>{
        try {
            const newStatus = "Pending";
            const response = await axios.post(`${BASE_URL}/Admin/ReassignTask`,{newStatus:newStatus,...TaskInput})
            alert(response.data)
            getdata()
            handleClose();
            setTaskInput(
                {
                    title:"",
                    description:"",
                    duration:""
                }
            )
        } catch (error) {
            console.log(error);
            alert("server error");
        }
          
      }
      const [TaskId ,setTaskId] =useState("");
      const handleDelete=async(TaskID)=>{

            handleShow2();
            setTaskId(TaskID)
        
      }

      const handleFinallCall=async()=>{

        try {
            const response = await axios.post(`${BASE_URL}/Admin/DeleteTask`,{TaskId:TaskId});
                alert(response.data);
                getdata();
                handleClose2()
        } catch (error) {
            alert(response.error.data);
        }
            
            
      }


    let sr=0;
    useEffect(()=>{
        getdata()
    },[])

    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Sr.no.</th>
                    <th>Task</th>
                    <th>Duration</th>
                    <th>Employee Name</th>
                    <th>Status</th>
                    <th>Re-Assign Task</th>
                    <th>Delete</th>
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
                                <td>{key.duration}day</td>
                                <td>{key.EmployeeId.EmployeeName}</td>
                                <td style={{background:key.status == "Pending" ? "orange" : "green",
                                    color:"white",
                                    
                                    borderRadius: "8px"}}>

                                        {key.status}
                                </td>
                                <td><button id="BtnStyle" onClick={()=>{handleReAssigmnet(key)}}>Re-assign</button></td>
                                <td><button id="BtnStyle" onClick={()=>{handleDelete(key._id)}}>Delete</button></td>
                                </tr>
                            </>
                        )
                    })}
                   
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            name='title'
                            value={TaskInput.title}
                            autoFocus
                            onChange={handleTaskInput}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          name="description"
                          controlId="exampleForm.ControlTextarea1"
                         
                        >
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" rows={3}  value={TaskInput.description} name='description' onChange={handleTaskInput}/>
                        </Form.Group>
                      </Form>
            
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Duration</Form.Label>
                          <Form.Control
                            type="number"
                            name='duration'
                            value={TaskInput.duration}
                            autoFocus
                            onChange={handleTaskInput}
                          />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={handleTaskSubmit}>
                        Assign
                      </Button>
                    </Modal.Footer>
                  </Modal>


                  <Modal show={show2} onHide={handleClose2}>
                          <Modal.Header closeButton>
                            <Modal.Title>Delete Task</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Are you really Want to Delete the Task</Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose2}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={handleFinallCall}>
                              Yes Delete
                            </Button>
                          </Modal.Footer>
                    </Modal>
        </>
    )
}

export default Status