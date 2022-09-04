import { scheduleJob } from "node-schedule";
import sendMail from "./sendMail.js";
import sendSMS from "./sendSMS.js";

function fire(data){

        // let current = new Date();
        // let diff = deadline.getTime() - current.getTime();
        // let diffDateMinutes = Math.floor((diff/1000)/60);
        // let minutes = [diffDateMinutes*0.25,diffDateMinutes*0.50,diffDateMinutes*0.75];
        // minutes = minutes.map((minute)=>{
        //     return new Date().setMinutes(new Date().getMinutes() + minute);
        // });
        // minutes = minutes.map((ele)=>{
        //     return new Date(ele);
        // })
       
        data.reminders.forEach((reminder,i)=>{
            scheduleJob(`${data.taskid}-${i}`,reminder,()=>{
                if(data.notificationType == "email"){
                    sendMail({
                        to: data.email,
                        subject: "Task Reminder",
                        body: `Hello ${data.fame} This email is a reminder for your task : ${data.taskName}
                       <br/><br/> 
                        Thank you <br /><br />
                        Regards <br />
                        <b> Team 3V </b>`
                    });
                
                }
                else if(data.notificationType == "phone"){
                    sendSMS({
                        to: data.phone,
                        body: `Hello ${data.fname} This message is a reminder for your task : ${data.taskName}`
                    });
                }
                else{
                    sendMail({
                        to: data.email,
                        subject: "Task Reminder",
                        body: `Hello ${data.fname} This email is a reminder for your task : ${data.taskName}
                       <br/><br/> 
                        Thank you <br /><br />
                        Regards <br />
                        <b> Team 3V </b>`
                    });
    
                    sendSMS({
                        to: data.phone,
                        body: `Hello ${data.fname} This message is a reminder for your task : ${data.taskName}`
                    });
                }
            })
        })
       
    
}

function cancelJob(){
    scheduleJob.cancel();
}

 export {fire,cancelJob};

