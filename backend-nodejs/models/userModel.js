import mongoose from "mongoose";

const userModel = mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum:["male", "female"],
        required:true
    },
    profilePhoto:{
        type:String,
        default:""
    }
},{timestamps:true});
export const User = mongoose.model("User", userModel);