
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import BASE_URL from '../config';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const AddTask=()=>{

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {setShow(true) ,setUserid(id)};

    const [data ,setData] = useState([])
  const [userId ,setUserid] = useState("");
  const getdata=async()=>{
      const response= await axios.get(`${BASE_URL}/Admin/UserData`)
      console.log(response.data);
      setData(response.data);
  }

  const [TaskInput ,setTaskInput] = useState({})
  const handleTaskInput=(e)=>{
      let value = e.target.value;
      let name = e.target.name;
      setTaskInput((key)=>({...key,[name]:value}));
      console.log(TaskInput);

  }

  const handleTaskSubmit=async()=>{
    try {
        const response = await axios.post(`${BASE_URL}/Admin/AddTask`,{userId:userId,...TaskInput})
        alert(response.data)
        handleClose();
    } catch (error) {
        console.log(error);
        alert("server error");
    }
      
  }

  let sr=0;
  useEffect(()=>{
      getdata();
  },[])
  return(
    <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr.no.</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Employee Role</th>
              <th>Assign Task</th>
            </tr>
          </thead>
          <tbody>
            {data.map((key)=>{
              sr++;
              return(
                <tr>
                  <td>{sr}</td>
                  <td>{key.EmployeeName}</td>
                  <td>{key.EmployeeEmail}</td>
                  <td>{key.EmployeeRole}</td>
                  <td><button id="BtnStyle" onClick={()=>{handleShow(key._id)}}>Assign Task</button></td>
                </tr>
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
                name='Title'
                
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
              <Form.Control as="textarea" rows={3} name='description' onChange={handleTaskInput}/>
            </Form.Group>
          </Form>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                name='date'
              
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
    </>
  )
}
export default AddTask