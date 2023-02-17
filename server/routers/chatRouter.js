const express = require('express');
const Chat = require("../models/chatModel");

const router = express.Router();

// // Create  Chat
router.post("/" , async(req, res)=>{

    try{
        const {senderId,receiverId} = req.body;

        let chat = new Chat({
            members : [senderId, receiverId]
        });

        chat = await chat.save();
        res.status(200).json(chat);
    }
    catch(error){
        res.status(500).json({"detail":"Internal Server Error"});
    }

});


// // get all Chats   

router.get("/:userId", async(req, res)=>{

    try{

        const chats = await Chat.find({
            members : {$in : req.params.userId}
        })
        res.status(200).json(chats);

    }
    catch(error){
        res.status(500).json({"detail":"Internal Server Error"});
    }

});

// // get Specific Chat

router.get("/find/:userId/:senderId", async(req, res)=>{

    try{
        
        const chat = await Chat.findOne({
            members : {$all:[req.params.userId, req.params.senderId]}
        });
        res.status(200).json(chat);

    }
    catch(error){
        res.status(500).json({"detail":"Internal Server Error"});
    }
});

module.exports = router;