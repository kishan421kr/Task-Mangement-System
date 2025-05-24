import { Outlet } from "react-router-dom"
import LoginNav from "./components/LoginNav"



const Layout=()=>{
  return(
    <>  
        <Outlet/>
    </>
  )
}
export default Layout