import { scheduleJob,scheduledJobs } from "node-schedule";
import sendMail from "./sendMail.js";
import sendSMS from "./sendSMS.js";

function fire(id,deadline,phone,email,type,name,taskName){

        let current = new Date();
        let diff = deadline.getTime() - current.getTime();
        // console.log(diff);
        let diffDateMinutes = Math.floor((diff/1000)/60);
        // console.log(diffDateMinutes);
        let minutes = [diffDateMinutes*0.25,diffDateMinutes*0.50,diffDateMinutes*0.75];
        // console.log(minutes);
        minutes = minutes.map((minute)=>{
            return new Date().setMinutes(new Date().getMinutes() + minute);
        });
        // console.log(minutes);
        minutes = minutes.map((ele)=>{
            return new Date(ele);
        })

        for (let index = 0; index < minutes.length; index++) {
            console.log(minutes[index].toString());
        }
        
      
        minutes.forEach((minute,index)=>{
            scheduleJob(`${id}-${index}`,minute,()=>{
                if(type == "email"){
                    sendMail({
                        to: email,
                        subject: "Task Reminder",
                        body: `Hello ${name} This email is a reminder for your task : ${taskName}
                       <br/><br/> 
                        Thank you <br /><br />
                        Regards <br />
                        <b> Team 3V </b>`
                    });
                
                }
                else if(type == "phone"){
                    sendSMS({
                        to: phone,
                        body: `Hello ${name} This message is a reminder for your task : ${taskName}`
                    });
                }
                else{
                    sendMail({
                        to: email,
                        subject: "Task Reminder",
                        body: `Hello ${name} This email is a reminder for your task : ${taskName}
                       <br/><br/> 
                        Thank you <br /><br />
                        Regards <br />
                        <b> Team 3V </b>`
                    });
    
                    sendSMS({
                        to: phone,
                        body: `Hello ${name} This message is a reminder for your task : ${taskName}`
                    });
                }
            })
        })
        console.log(scehduledJobs);
        
    
}

 export default fire;

