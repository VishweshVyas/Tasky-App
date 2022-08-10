import jwt from "jsonwebtoken";
import express from "express";
import config from "config";

const router = express.Router();

router.get("/verifyToken",async(req,res)=>{
    try {
        let token = localStorage.getItem("token");
        if(!token) return res.status(401).send(false);
        // jwt.verify(token,tokenToCompareWith,callback to check if token was valid or not)
    } 
    catch (error) {
        console.log(error);
    }
})

export default router;