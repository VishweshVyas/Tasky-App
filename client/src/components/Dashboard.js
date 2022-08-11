import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function Dashboard({ loading, showLoading }) {

    let navigate = useNavigate();

    const[userId,setUserId] = useState("");

    const logout = () =>{
        localStorage.removeItem("token");
    }
    const[checked,setChecked] = useState(false);
    const[formData,setFormData] = useState({
        taskname : "",
        deadline : "",
        notificationType : "",
        agree : ""
    });

    const handleChange = (e) =>{
        
        setChecked(!checked);
        let name = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [name] : value
        });
    }

    const handleSubmit = async(e) =>{
        try {
            e.preventDefault();
            let {data} = await axios.post(`/api/user/dashboard/${userId}`,formData);
            console.log(data);
        } 
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchUser() {
            try {
                showLoading(true);
                const { data } = await axios.get("/api/user/auth", {
                    headers: {
                        'auth-token': localStorage.getItem("token")
                    }
                });
                console.log(data);
                setUserId(data.user_id);
                showLoading(false);
            } catch (error) {
                localStorage.removeItem("token");
                showLoading(false);
                navigate("/login");
            }
        }
        fetchUser();
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <div style={{ backgroundColor: "#e5e5e5", padding: "15px", textAlign: "center" }}>
                    {loading && <Loading/>}
                  <h1>Tasky App</h1>
            </div>
            <div style={{ overflow: "auto" }}>

                <div className="main">
                    <h2>Schedule New Tasks</h2> <hr />
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="taskname">
                            <b>Task Name</b>
                        </label><br />
                        <input
                            type="text"
                            placeholder="Enter your taskname"
                            name="taskname"
                            value={formData.taskname}
                            onChange={handleChange}
                        />
                        <label htmlFor="deadline">
                            <b>Deadline</b>
                        </label> <br />
                        <input
                            type="datetime-local"
                            placeholder="Enter your Task Deadline"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                        /><br />
                        <label htmlFor="notificationType"><b>Notification Type</b></label> <br />

                        <select name="notificationType"  onChange={handleChange}>
                            <option value="">Choose your Notification Type</option>
                            <option value="sms">SMS</option>
                            <option value="email">Email</option>
                            <option value="both">Both</option>
                        </select>
                        <hr />
                        <input
                            type="checkbox"
                            name="agree"
                            value={checked}
                            onChange={handleChange}
                        ></input>

                        <label htmlFor="agree">
                            By clicking Schedule Job Button below, you agree to receive emails
                            and messages as reminder notifications
                        </label> <br />
                        <br /><br />
                        <input type="submit" value="Schedule Job" />
                    </form>
                </div>
                <div className="menu">
                    <Link to="/">Link 1</Link>
                    <Link to="/">Link 2</Link>
                    <Link to="/">Link 3</Link>
                    <Link to="/" onClick={logout}>Log out</Link>
                </div>

            </div>
        </>
    )
}

export default Dashboard;