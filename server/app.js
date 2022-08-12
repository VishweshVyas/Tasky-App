import express from "express";
import "./dbConnect.js";
import userRouter from "./controllers/users/index.js";
import config from "config";
import taskRouter from "./controllers/tasks/index.js";

const port = config.get("PORT");
const app = express();
app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/task",taskRouter);



app.listen(port, () => {
    console.log(`Server running at ${port}`);
})