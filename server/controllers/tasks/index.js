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
        let notificationType = req.body.notificationType;
        let taskName = req.body.taskname;
        let current = new Date();
        let deadline = new Date(req.body.deadline)
        let thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        let thirtDaysInFuture = new Date().getTime() + thirtyDaysInMs;
        let date = new Date();
        date = date.setMinutes(date.getMinutes() + 30);
        
        if (current > deadline) {
            return res.status(401).json({ error: "Date cannot be backdated" });
        }
        else if (deadline < date) {
            return res.status(401).json({ error: "The deadline must be more than 30 minutes from the current time." });
        }
        else if (deadline > thirtDaysInFuture) {
            return res.status(401).json({ error: "The deadline must be within 30 days." });
        }
       
        userData.tasks.push(req.body);
        
        await userData.save();

        fire(userData.user_id,deadline,userData.phone,userData.email,notificationType,userData.fname,taskName);

        res.status(200).json({ success: "New Task has been scheduled" });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
});

router.put("/edit/:toDoId", authMiddleware, async (req, res, next) => {
    try {
        const userData = await User.findById(req.user.user_id);
        let notificationType = req.body.notificationType;
        let taskName = req.body.taskname;
        let current = new Date();
        let deadline = new Date(req.body.deadline)
        let thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        let thirtDaysInFuture = new Date().getTime() + thirtyDaysInMs;
        let date = new Date();
        date = date.setMinutes(date.getMinutes() + 30);
        
        if (current > deadline) {
            return res.status(401).json({ error: "Date cannot be backdated" });
        }
        else if (deadline < date) {
            return res.status(401).json({ error: "The deadline must be more than 30 minutes from the current time." });
        }
        else if (deadline > thirtDaysInFuture) {
            return res.status(401).json({ error: "The deadline must be within 30 days." });
        }
       
        userData.tasks.push(req.body);
        
        await userData.save();

        fire(userData.user_id,deadline,userData.phone,userData.email,notificationType,userData.fname,taskName);

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
