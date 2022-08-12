import { scheduleJob } from "node-schedule";

let reminders = [];
function fire(deadline) {
    // reminders.push(new Date(deadline/4),new Date(deadline/2),new Date(deadline*0.75));
    // reminders.push(deadline.toLocaleTimeString('en-US'));

    
    
        // scheduleJob("Job1", reminders[0], () => {
        //     console.log("FIre SMS");;
        //     console.log("Fire EMail");
        // });
        // scheduleJob("Job2", reminders[1], () => {
        //     console.log("FIre SMS");;
        //     console.log("Fire EMail");
        // });
        // scheduleJob("Job3", reminders[2], () => {
        //     console.log("FIre SMS");;
        //     console.log("Fire EMail");
        // });
console.log(reminders);
    
   
}

export default fire;

