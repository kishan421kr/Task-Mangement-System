
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import BASE_URL from '../config';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ManageEmp=()=>{


      const [show2, setShow2] = useState(false);
      
          const handleClose2 = () => setShow2(false);
          const handleShow2 = () => setShow2(true);
    const [data ,setData] = useState([])
    
        const getdata =async()=>{
            const response = await axios.get(`${BASE_URL}/Admin/EmployeesDetail`)
            setData(response.data);
            console.log(response.data);
        }

        const [EmployeeId ,setEmployeeId] =useState("");
              const handleDelete=async(EmpID)=>{
        
                    handleShow2();
                    setEmployeeId(EmpID)
                
              }
        
              const handleFinallCall=async()=>{
        
                try {
                    const response = await axios.post(`${BASE_URL}/Admin/RemoveEmployee`,{EmployeeId:EmployeeId});
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
                    <th>Employee Name</th>
                    <th>Employee Email</th>
                    <th>Department</th>
                    <th>Remove Employee</th>
                    </tr>
                </thead>
                <tbody>
                   {data.map((key)=>{
                    sr++;
                    return(
                        <>
                            <tr>
                                <td>{sr}</td>
                                <td>{key.EmployeeName}</td>
                                <td>{key.EmployeeEmail}</td>
                                <td>{key.EmployeeRole}</td>
                                <td><button onClick={()=>{handleDelete(key._id)}}>Remove</button></td>
                            </tr>
                        </>
                    )
                   })}
                </tbody>
            </Table>


            
            
            
                              <Modal show={show2} onHide={handleClose2}>
                                      <Modal.Header closeButton>
                                        <Modal.Title>Remove Employee</Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>Are you really Want to Remove the Employee</Modal.Body>
                                      <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose2}>
                                          Close
                                        </Button>
                                        <Button variant="primary" onClick={handleFinallCall}>
                                          Yes Remove
                                        </Button>
                                      </Modal.Footer>
                                </Modal>
        </>
    )
}
export default ManageEmp