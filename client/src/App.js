import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import PrivateRoutes from './utils/PrivateRoutes';


function App() {

  const [alert, setAlert] = useState(null);

  const createAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  return (

    <>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register alert={alert} createAlert={createAlert} />} ></Route>
        <Route path="/login" element={<Login alert={alert} createAlert={createAlert} />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;
