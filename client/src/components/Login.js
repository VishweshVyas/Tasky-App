import axios from "axios";
import { useState } from "react";
import {Link} from "react-router-dom";
import Alert from "./Alert";

function Login({alert,createAlert}) {

    const[login,setLogin] = useState({
        loginEmail : "",
        loginPassword : ""
    });

    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setLogin({
            ...login,
            [name] : value
        });
    }

    const handleSubmit = async(e)=>{
       try {
           e.preventDefault();
           let {data}= await axios.post("/api/user/login",login);
           console.log(data);
           createAlert({type : "success",msg:data.success});
           
       } 
       catch (error) {
           console.log(error);
           createAlert({type:"danger",msg:error.response.data.error})
       }
    }

    return (
        <>
            <div className="container">
                <div style={{ marginTop: "20%" }}>
                    <center>
                        <Link to="/">
                            <img src="https://www.transparentpng.com/thumb/clock/amoxZ0-clock-clipart-hd.png" alt="img" style={{ width: '20%' }} />
                            <h1> Tasky Login</h1>
                        </Link>
                    </center>
                </div>
                <div>
                <Alert alert={alert}/>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="loginEmail"><b>Email:</b></label><br />
                        <input type="email" name="loginEmail" value={login.loginEmail} onChange={handleChange}/><br />
                        <label htmlFor="loginPassword"><b>Password</b></label><br />
                        <input type="password" name="loginPassword" value={login.loginPassword} onChange={handleChange}/><br /><br />
                        <input type="submit" value="Login" />
                    </form>

                </div>
                <p> Don't have an account ? <Link to="/register"><b>Register</b> </Link></p>
            </div>
        </>
    );
}

export default Login;