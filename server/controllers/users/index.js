import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../../models/Users.js";
import sendMail from "../../utils/sendMail.js";
import sendSMS from "../../utils/sendSMS.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/*
    API : /api/user/register
    Desc : User SignUp
    Method : POST
    Body : email,password,fname,phonenumber
    Params : -
    Access : Public
    Validations : Unique email, Password Strength
*/

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
            to: req.body.phone,
            body: `Hello ${req.body.fname} Click here to verify your phone number : ${config.get("URL")}/api/user/verify/sms/${smsToken}`
        })

        res.send({ "success": "Your account is successfully created" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal Server Error` });
    }
});

/*
    API : /api/user/verify/sms/:token
    Desc : User number verification
    Method : GET
    Body : -
    Params : token
    Access : Public
    Validations : Valid token
*/

router.get("/verify/sms/:token", async (req, res) => {
    try {
        let userSmsToken = req.params.token;
        let userData = User.findOne({ "verifyToken.sms": userSmsToken });
        if (userData.verifiedUser.sms) {
            return res.status(200).send("<h1> Phone Number is already verified.");
        }
        else {
            userData.verifiedUser.sms = true;
            await userData.save();
            res.status(200).send("<h1> Phone Number is Verified Successfully");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal Server Error` });
    }
});

/*
    API : /api/user/verify/email/:token
    Desc : User email verification
    Method : GET
    Body : -
    Params : token
    Access : Public
    Validations : Valid token
*/


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
});

/*
    API : /api/user/login
    Desc : User  verification
    Method : POST
    Body : email,password
    Params : -
    Access : Public
    Validations : Valid email,password
*/


router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.loginEmail })
        if (!userData) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        let match = await bcrypt.compare(req.body.loginPassword, userData.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        let payload = {
            user_id: userData._id,
            email: userData.email
        }
        let token = jwt.sign(payload, config.get("SECRET_KEYS.JWT"), { expiresIn: "1h" });

        res.status(200).json({ token });

    }
    catch (error) {
        console.log(error);
        res.status.json({ error: "Internal Server Error" });
    }
});

/*
    API : /api/user/auth
    Desc : token  verification
    Method : GET
    Body : -
    Params : -
    Access : Private
    Headers : token
    Validations : Valid token
*/

router.get("/auth", async (req, res) => {
    try {
        let decoded = jwt.verify(req.headers["auth-token"], config.get("SECRET_KEYS.JWT"));
        // console.log(decoded);
        res.status(200).json({ user_id: decoded.user_id });
    } catch (error) {
        // console.log(error);
        res.status(401).json({ error: 'Unauthorised or Token Expired' });
    }
});

// router.post("/dashboard/:userId", async (req, res) => {
//     try {
//         let id = req.params.userId;
//         let userFound = await User.findById(id);
//         let{taskname,deadline,notificationType,agree} = await req.body;
//         console.log(agree);
//         // Have to map the data to the database
    

       

//     }
//     catch (error) {
//         console.log(error);
//     }
// })

export default router;

