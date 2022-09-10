import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Alert from "./Alert";
import ScheduleTask from "./ScheduleTask";

function Dashboard({ loading, showLoading, alert, createAlert }) {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
    }
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getTasks() {
            try {
                const { data } = await axios.get("/api/task/", {
                    headers: {
                        'auth-token': localStorage.getItem("token")
                    }
                })
                setTasks(data.tasks);
            }
            catch (error) {
                console.log(error);
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
        getTasks();
    }, [])

    console.log(tasks);
    return (
        <>
            <div style={{ backgroundColor: "#e5e5e5", padding: "15px", textAlign: "center" }}>

                <h1>Tasky App</h1>
            </div>
            <div style={{ overflow: "auto" }}>
                {loading && <Loading />}
                <div className="main">
                    <Alert alert={alert} />
                    <table>
                        <thead>
                            <th>S. Number</th>
                            <th>TaskName</th>
                            <th>Deadline</th>
                            <th>NotificationType</th>
                            <th>Completed</th>
                            <th>Email Button</th>
                            <th>Delete Button</th>
                        </thead>
                        <tbody>
                            {
                                tasks.map((ele, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{ele.taskname}</td>
                                                <td>{ele.deadline}</td>
                                                <td>{ele.notificationType}</td>
                                                <td>{String(ele.isCompleted)}</td>
                                                <td><button>Edit Button</button></td>
                                                <td><button>Delete Button</button></td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="menu">
                    <Link to="/dashboard/add">Add a new Task</Link>
                    <Link to="/">Link 2</Link>
                    <Link to="/">Link 3</Link>
                    <Link to="/" onClick={logout}>Log out</Link>
                </div>

            </div>




        </>
    )
}

export default Dashboard;