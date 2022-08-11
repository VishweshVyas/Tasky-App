import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import Loading from "./Loading";

function Login({ alert, createAlert,loading,showLoading }) {

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
                navigate("/dashboard",{replace:true});
        }
    }, []);

    
    const [login, setLogin] = useState({
        loginEmail: "",
        loginPassword: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLogin({
            ...login,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            showLoading(true);
            let { data } = await axios.post("/api/user/login", login);
            showLoading(false);
            localStorage.setItem("token", data.token)
            navigate("/dashboard", { replace: true });
            
        }
        catch (error) {
            if (localStorage.getItem("token")) {
                localStorage.removeItem("token");
            }
            console.log(error);
            createAlert({ type: "danger", msg: error.response.data.error });
            showLoading(false);
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
                            {loading && <Loading/>}
                        </Link>
                    </center>
                </div>
                <div>
                    <Alert alert={alert} />
                   
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="loginEmail"><b>Email:</b></label><br />
                        <input type="email" name="loginEmail" value={login.loginEmail} onChange={handleChange} /><br />
                        <label htmlFor="loginPassword"><b>Password</b></label><br />
                        <input type="password" name="loginPassword" value={login.loginPassword} onChange={handleChange} /><br /><br />
                        <input type="submit" value="Login" />
                    </form>

                </div>
                <p> Don't have an account ? <Link to="/register"><b>Register</b> </Link></p>
            </div>
        </>
    );
}

export default Login;