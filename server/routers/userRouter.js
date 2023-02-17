const express = require('express');
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require("../models/userModel");


const router = express.Router();


// // Get user

router.get("/:id", async(req, res)=>{

    try{

        const user = await User.findById(req.params.id).select("-password");
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({"detail": "user not found"});
        }
    }
    catch(error){
        res.status(500).json({"detail": "Internal Server Error"});
    }

});



// // Update user

router.put("/:id", async(req, res)=>{

    try{
        
        const id = req.params.id;
        const { userId, isAdmin , password} = req.body;

        if(userId === id || isAdmin){

            if(password){
                const salt = await bycript.genSalt(10);
                req.body.password = await  bycript.hash(password, salt);
            }

            const user = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});

            const userInfo = user._doc;

            delete userInfo.password;

            const auth_token = jwt.sign({ user: user.username, id: user._id }, process.env.JWT_KEY);

            res.status(200).json({success: true,user: userInfo, token:auth_token});

        }
        else{
            res.status(404).json({success: false,"detail" : "you can not update others profile"});
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false,"detail": "Internal Server Error"});        
    }
});



// // Delete user 

router.delete("/:id", async(req, res)=>{

    try{

        const id = req.params.id;
        const {userId, isAdmin} = req.body;

        if(userId===id || isAdmin){

            const user = await User.findByIdAndDelete(id);

            if(user){
                res.status(200).json({"detail" : "user deleted"});
            }
            else{
                res.status(404).json({"detail" : "user not found"});
            }

        }
        else{
            res.status(404).json({"detail" : "you can not delete others profile"});
        }

    }
    catch(error){
        res.status(500).json({"detail": "Internal Server Error"});        
    }
});



// follow user

router.put("/follow/:id", async(req, res)=>{
    
    try{

        const id = req.params.id;
        const { userId } = req.body;

        if(!(userId===id)){

            const followUser = await User.findById(id);
            const followingUser = await User.findById(userId);

            if(!followUser.followers.includes(userId)){
                
                await followUser.updateOne({$push: {followers: userId}});
                await followingUser.updateOne({$push: {following : id}});
                res.status(200).json({"detail": "Followed user"});
            }
            else{
                res.status(400).json({"detail": "Already Followed user"});
            }
        }
        else{
            res.status(400).json({"detail": "you can not follow you"})
        }

    }
    catch(error){
        res.status(500).json({"detail": "Internal Server Error"});        
    }

});


// // UnFollow user

router.put("/unfollow/:id",async (req,res)=>{

    try{

        const id = req.params.id;
        const { userId } = req.body;

        if(!(userId===id)){
            
            const followUser = await User.findById(id);
            const followingUser = await User.findById(userId);
            
            if(followUser.followers.includes(userId)){
                await followUser.updateOne({$pull : {followers : userId}});
                await followingUser.updateOne({$pull : {following : id}});
                res.status(200).json({"detail": "Unfollowed user"})
            }
            else{
                res.status(400).json({"detail": "You not Followed user"});
            }
        }
        else{
            res.status(400).json({"detail": "you can not unfollow you"})
        }

    }
    catch(error){
        res.status(500).json({"detail": "Internal Server Error"});        
    }
});



router.get("/suggestions/:id", async(req, res)=>{

    try{
        const id = req.params.id;

        const user = await User.findById(id)


        const followed = user.following;


        const suggestionsUsers = await User.find({_id : {$nin : followed}},{password : 0, isAdmin : 0} ).limit(20);
        res.status(200).json(suggestionsUsers);
    }
    catch(error){
        res.status(500).json({"detail":"Internal Server Error"});
    }

});



module.exports = router;