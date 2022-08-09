import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../../models/Users.js";
import sendMail from "../../utils/sendMail.js";
import sendSMS from "../../utils/sendSMS.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        let userData = await User.findOne({ email: req.body.email });
        if (userData) return res.status(400).json({ error: `Email already exists` });

        let newUser = new User(req.body);
        newUser.password = await bcrypt.hash(req.body.password, 12);
        let emailToken = (Math.random() + 1).toString(16).substring(2);
        let smsToken = (Math.random() + 1).toString(16).substring(2);
        newUser.verifyToken.email = emailToken;
        newUser.verifyToken.sms = smsToken;
        await newUser.save();

        // Writing logic to send email to the email address provided to verify it.

        sendMail({
            to: req.body.email,
            subject: "Team 3V",
            body: `Hello ${req.body.fname} Please <a href='${config.get("URL")}/api/user/verify/email/${emailToken}'>Click Here </a>to
            verify your email. <br/><br/>
            
            Thank you <br /><br />
            Regards <br />
            <b> Team 3V </b>`
        });

        // Writing logic for verifying mobile number;
        
        sendSMS({
             to : req.body.phone,
             body: `Hello ${req.body.fname} Click here :  href=${config.get("URL")}/api/user/verify/sms/${smsToken}`
        })

        res.send({ "success": "Your account is successfully created" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal Server Error` });
    }
});

router.get("/verify/sms/:token", async (req, res) => {
    try {
        let userSmsToken = req.params.token;
        let userData = User.findOne({"verifyToken.sms" : userSmsToken});
        if(userData.verifiedUser.sms){
            return res.status(200).send("<h1> Email is already verified.");
        }
        else{
            userData.verifiedUser.sms = true;
            await userData.save();
            res.status(200).send("<h1> Phone Number is Verified Successfully");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal Server Error` });
    }
})

router.get("/verify/email/:token", async (req, res) => {
    try {
        let userToken = req.params.token;
        const userData = await User.findOne({ "verifyToken.email": userToken });
        if (userData.verifiedUser.email) {
            return res.status(200).send("<h1> Email is already verified.");
        }
        else {
            userData.verifiedUser.email = true;
            await userData.save();
            res.status(200).send("<h1> Email is Verified Successfully");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal Server Error` });
    }
})

router.post("/login", async (req, res) => {
    try {
        let userFound = await User.findOne({ email: req.body.loginEmail });

        if (userFound) {
            let pwd = await bcrypt.compare(req.body.loginPassword, userFound.password);
            if (pwd) {
                res.status(200).json({ "success": "User Verified successfully" });

            } else {
                res.status(400).json({ error: "Invalid credentials" });

            }
        } else {
            res.status(400).json({ error: "User does not exist" });

        }

    }
    catch (error) {
        console.log(error);
        res.status.json({ error: "Internal Server Error" });
    }
});

export default router;
