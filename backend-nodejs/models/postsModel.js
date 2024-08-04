import mongoose from "mongoose";

const postModel = mongoose.Schema({

    captions: {
        type: String,
        default: ""
    },
    tags: [{
        type: String,
        default: ""
    }],
    image: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }]
}, { timestamps: true });

export const Post = mongoose.model("Post", postModel);