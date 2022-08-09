import nodemailer from 'nodemailer';
import config from "config";

const {HOST,AUTH} = config.get("EMAIL_SMTP");
async function sendMail(emailData) {

    try {
        let transporter = nodemailer.createTransport({
            host: HOST,
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: AUTH["USER"], // generated ethereal user
                pass: AUTH["PASS"], // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: '"Team 3V" <vishwesh@viznu.dev>', // sender address
            to: emailData.to, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.body, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    }
    catch (error) {
        console.log(error);
    }
}

export default sendMail;