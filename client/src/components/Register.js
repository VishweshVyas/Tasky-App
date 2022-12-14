import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Alert from "./Alert";
import axios from "axios";
import Loading from "./Loading";


function Register({createAlert,alert,loading,showLoading}) {
    let navigate = useNavigate();
    const[user,setUser] = useState({
        fname : "",
        email: "",
        phone : "",
        password : "",
        password2 : ""
    });

    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit = async(e) =>{
       try {
           e.preventDefault();
           if(user.password !== user.password2){
                createAlert({msg:"Passwords do not match",type:"danger"})
           }
           else{
            showLoading(true);
             let {data} = await axios.post("/api/user/register",user);
             createAlert({type : "success",msg:data.success});
             navigate("../login", { replace: true });
             showLoading(false);
           }
       } 
       catch (error) {
           console.log(error);
           createAlert({type : "danger",
                        msg : error.response.data.error});
       }
       showLoading(false);
    }
    return (
        <>
            <div className="container">
                <div>
                    <center>
                        <Link to="/">
                            <img src="https://www.transparentpng.com/thumb/clock/amoxZ0-clock-clipart-hd.png" alt="img" style={{ width: "15%" }} />
                            <h1> Tasky Register</h1>
                            {loading && <Loading/>}
                        </Link>
                    </center>
                </div>
                <div>
                <Alert alert={alert}/>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fname"><b>Full Name :</b></label>
                        <input type="text" name="fname"  value={user.fname} onChange={handleChange}/>
                        <label htmlFor="email"><b>Email:</b></label>
                        <input type="email" name="email" value={user.email} onChange={handleChange}/>
                        <label htmlFor="fullname"><b>Phone Number:</b></label>
                        <input type="tel" name="phone"  value={user.phone} onChange={handleChange}/>
                        <label htmlFor="lname"><b>Password</b></label>
                        <input type="password" name="password" value={user.password} onChange={handleChange}/>
                        <label htmlFor="lname"><b>Confrm Password</b></label>
                        <input type="password" name="password2" value={user.password2} onChange={handleChange}/>
                        <input type="submit" value="Register" />
                    </form>
                </div>
                <p>Already have an account ? <Link to="/login"> <b>Login </b> </Link></p>
            </div>
        </>
    );
}

export default Register;