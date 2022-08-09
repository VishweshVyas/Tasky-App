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
    }
});

const User = mongoose.model("User",userSchema,"users");

export default User;