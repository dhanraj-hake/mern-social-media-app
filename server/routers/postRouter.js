const express = require('express');
const mongoose = require('mongoose');

const Post = require("../models/postModel");
const User = require("../models/userModel");

const router = express.Router();


// // Get Post

router.get("/:id", async(req, res) => {

    try{
        const id = req.params.id;

        const post = await Post.findById(id);


        if(post){
            res.status(200).json(post);
        }
        else{
            res.status(404).json({"detail": "Post not found"});
        }
    }
    catch(error){
        res.status(500).json({"detail": "Internal Server Error"});
    }

});



// // Create post

router.post("/", async (req, res) => {

    try{

        // if(!req.body.usesrId){
        //     return res.status(404).json({"detail": "userid required"});
        // }

        let post = new Post(req.body);
        post = await post.save();
        res.status(200).json(post);
    }
    catch(error){
        res.status(500).json({"detail": "Internal Server Error"});
    }

});


// // Update post 

router.put("/:id", async(req, res)=>{

    try{
        const id = req.params.id;
        const { userId } = req.body;

        const post = await Post.findById(id);
        
        if(post.userId === userId){
            
            const updatetedPost = await Post.findByIdAndUpdate(id,{$set : req.body}, {new : true});
            res.status(200).json(updatetedPost);
            
            // await post.updateOne({$set : req.body});
            // const updatetedPost = await Post.findById(id);
            // res.status(200).json(updatetedPost);
        }
        else{
            res.status(404).json({"detail": "you can not update other post"});
        }
    }
    catch(error){
        res.status(500).json({"detail": "Internal Server Error"});
    }
});


// // Delete post

router.delete("/:id", async(req, res)=>{

    try{
        const id = req.params.id;
        const { userId } = req.body;

        let post = await Post.findById(id);

        if(!post){
            return res.status(404).json({"detail": "post not found"});
        }

        console.log(post, userId);
        if(post.userId === userId){

            post = await Post.findByIdAndDelete(id);
            res.status(200).json({"detail":"post deleted"});
            
        }
        else{
            res.status(404).json({"detail": "you can not delete other post"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({"detail": "Internal Server Error"});
    }

});





// // Like and Dislike post

router.put("/like/:id", async(req, res)=>{
    
    
    try{
        const postId = req.params.id;
        const { userId } = req.body;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(400).json({"detail": "post not found"});
        }

        if(!post.likes.includes(userId)){
            await post.updateOne({$push : {likes : userId}});
            res.status(200).json({"detail": "post liked"});
        }
        else{
            await post.updateOne({$pull : {likes : userId}});
            res.status(200).json({"detail": "post unliked"});
        }

    }
    catch(error){

    }

});



// Get Posts of User 

router.get("/user/:id", async(req, res)=>{

    try{    
        const id = req.params.id;
        const posts = await Post.find({userId : id});

        res.status(200).json(posts);

    }
    catch(error){
        res.status(500).json({"detail":"Internal Server Error"});
    }
});



// // Time linle posts

router.get("/timeline/:id", async(req, res)=>{

    try{

        const id = req.params.id;

        const currentUserPost = await Post.find({userId: id});

        const followersPosts = await User.aggregate([
            {
                $match :{
                    _id : mongoose.Types.ObjectId(id)
                },
            },
            {
                $lookup : {
                    from : "posts",
                    localField : "following",
                    foreignField : "userId",
                    as : "followersUserPosts"
                }
            },
            {
                $project : {
                    followersUserPosts : 1,
                    _id : 0
                }
            }
        ]);

        res.status(200).json(currentUserPost.concat(followersPosts[0].followersUserPosts));


    }
    catch(error){
        console.log(error);
        res.status(500).json({"details": "Internal Server Error"});
    }   

});


module.exports =  router;