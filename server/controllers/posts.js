const mongoose = require("mongoose");
//const Post  = require("../../client/src/components/Posts/Post/Post");
const PostMessage=require("../models/postMessage")

const getPosts=async(req,res)=>{
    try{
        const postMessages=await PostMessage.find();
        //console.log(postMessages);
        res.status(200).json(postMessages);
    }
    catch(err){
        console.log(err);
        res.status(404).json({Error:err});
    }
}

const createPost=async(req,res)=>{
    const post=req.body;
    const newPost= new PostMessage({...post,creator:req.userId,
    createdAt:new Date().toISOString()});
    try{
        await newPost.save();
        res.status(200).json(newPost);
    }
    catch(err){
        console.log(err);
        res.status(404).json({Error:err});
    }
}

const updatePost=async(req,res)=>{
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

const deletePost=async(req,res)=>{
    const id=req.params.id;
    //console.log(req.params);
    //const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Id Not Found");
    
    await PostMessage.findByIdAndRemove(id);
    res.status(200).json({message:"DELETED"});
}

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

module.exports={getPosts,createPost,updatePost,deletePost,likePost};