import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    verifyToken : {
        email :{
            type : String,
            required : true
        },
        sms : {
            type : String,
            required : true
        }
    },
    verifiedUser : {
        email :{
            type : Boolean,
            default : false
        },
        sms : {
            type : Boolean,
            default : false
        }
    },

    tasks : [
        {
            taskname  : {
                type : String,
                required : true,
                default : ""
            },

            deadline : {
                type : String,
                required : true,
                default : ""
            },

            notificationType : {
                type : String,
                required : true,
                default : ""
            },
            agree : {
                type : String,
                required : true,
                default : ""
            }
        }
    ]
});

const User = mongoose.model("User",userSchema,"users");

export default User;