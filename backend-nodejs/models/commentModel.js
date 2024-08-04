import mongoose from "mongoose";

const commentModel = mongoose.Schema({

    text:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    replies:[{
        type:mongoose.Schema.types.ObjectId,
        ref:"Replies"
    }],
    commentLikes:[{
        type:mongoose.Schema.typea.ObjectId,
        ref:"User"
    }]
});
export const Comment = mongoose.model("Comment", commentModel);