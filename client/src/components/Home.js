import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <center>
                <div>
                    <img src="https://www.transparentpng.com/thumb/clock/amoxZ0-clock-clipart-hd.png" alt="clock-img" />
                </div>
                <div>
                    <Link to="/dashboard"><h3>Tasky App</h3></Link>
                </div>


            </center>
        </div>
    );
}

export default Home;