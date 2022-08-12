import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../../models/Users.js";
import sendMail from "../../utils/sendMail.js";
import sendSMS from "../../utils/sendSMS.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../../middlewares/auth.js"
import fire from "../../utils/worker.js";

const router = express.Router();
/*
    API : /api/task/add
    Desc : Task addition
    Method : POST
    Body : taskname,deadline,notificationtype
    Access : Private
    Validations : valid token
*/

router.post("/add", authMiddleware, async (req, res, next) => {
    try {
        const userData = await User.findById(req.user.user_id);
        let current = new Date();
        let deadline = new Date(req.body.deadline)
        if (current > deadline) {
            return res.status(401).json({ error: "Date cannot be backdated" });
        }
        // else if (new Date(req.body.deadline)) {
        //     //check if it is less than 30 minutes
        // }
        // else if (new Date(req.body.deadline)) {
        //     // check if it is > 30 days 
        // }
        userData.tasks.push(req.body);

        


        // await userData.save();


        // fire(new Date(req.body.deadline));

        res.status(200).json({ success: "New Task has been scheduled" });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
});
export default router;

// Features to add :
// 1 . To add a condition that the deadline should be > 30 Minutes && should be within 30 days.
// 2. Based on the deadline, we need to schedule jobs.

 //Note : Sharing variables between middleware is only possibe via req obj
