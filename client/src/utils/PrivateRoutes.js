import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

function PrivateRoutes() {

    const[status,setStatus]= useState(false);
    let token = localStorage.getItem("token");
    if(!token) return (<Navigate to="/login"/>);
    useEffect(()=>{
        const verifyToken = async()=>{
            try {
                let token = await axios.get("/verifyToken");
                token ? setStatus(true) : setStatus(false);
            } 
            catch (error) {
                console.log(error);
            }
        }

        verifyToken();
    },[]);
    
    return (
        
            status ? <Outlet/> : <Navigate to="/login" />
        )
}

export default PrivateRoutes;