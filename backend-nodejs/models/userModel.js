import mongoose from "mongoose";
import { Post } from "./postsModel.js";

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
        enum: ["male", "female"],
        required: true
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
}, { timestamps: true });
export const User = mongoose.model("User", userModel);