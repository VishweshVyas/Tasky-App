import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "./dbConnect.js";
import "./models/Users.js";
import User from "./models/Users.js";


const port = 5000;
const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hello from server");
// });

app.post("/api/user/register", async (req, res) => {
    try {
        let userData = await User.findOne({ email: req.body.email });
        if (userData) return res.status(400).json({ error: `Email already exists` });

        let newUser = new User(req.body);
        newUser.password = await bcrypt.hash(req.body.password,12);
        newUser.save();
        res.send({"success" : "User successfully registered"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal Server Error` });
    }
});


app.post("/api/user/login",async(req,res)=>{
    try {
       let userFound = await User.findOne({email:req.body.loginEmail});
       
       if(userFound){
          let pwd =  await bcrypt.compare(req.body.loginPassword,userFound.password);
          if(pwd){
              res.status(200).json({"success" : "User Verified successfully"});
            
          }else{
              res.status(400).json({error : "Invalid credentials"});
            
          }
       } else{
           res.status(400).json({error:"User does not exist"});
           
       }
   
    } 
    catch (error) {
        console.log(error);
        res.status.json({error:"Internal Server Error"});
    }
});



app.listen(port, () => {
    console.log(`Server running at ${port}`);
})