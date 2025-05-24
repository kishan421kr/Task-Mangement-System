import {Route,BrowserRouter,Routes} from "react-router-dom"
import Layout from "./Layout"

import Dashboard from "./pages/Dashboard"
import UserHome from "./UserHome"
import Login from "./pages/Login"
import AddEmp from "./pages/ADD Employee"
import AddTask from "./pages/AddTask"
import Status from "./pages/TaskStatus"
import ManageEmp from "./pages/ManageEmployee"


const App=()=>{
  return(
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Login/>}/>
            </Route>
            <Route path="Dashboard" element={<Dashboard/>}>
              <Route index element={<AddEmp/>}/>
              <Route path="addemp" element={<AddEmp/>}/>
              <Route path="addTask" element={<AddTask/>}/>
              <Route path="status" element={<Status/>}/>
              <Route path="manageEmp" element={<ManageEmp/>}/>
            </Route>
            <Route path="UesrDashBoard" element={<UserHome/>}> 

            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}
export default App