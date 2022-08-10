const mongoose=require("mongoose");

const postSchema=mongoose.Schema(
    {
        title:String,
        message:String,
        name:String,
        creator:String,
        tags:[String],
        selectedFile:[String],
        likes:{type:[String],default:[]},
        dislikeCount:{type:Number,default:0},
        createdAt:{type:Date,default:new Date()}
    }
)

const PostMessage=mongoose.model("PostMessage",postSchema);
module.exports=PostMessage;