
import { Link } from "react-router-dom"

const LoginNav=()=>{
  return(
    <>
        <div style={{display:"flex" ,justifyContent:"center",gap:"40px",backgroundColor:"green",padding:"20px"}}>
            <div>
               <Link to={"UserLogin"} >User Login </Link> 
            </div>
            <div>
                <Link to={"AdminLogin"} >Admin Login </Link> 
                
            </div>
        </div>
    </>
  )
}
export default LoginNav