const express = require('express');

const Message = require("../models/messageModel");

const router = express.Router();


// // create send message

router.post("/", async(req, res)=>{

    try{
        const {chatId, senderId, message} = req.body;

        let messageObj = new Message({
            chatId : chatId,
            senderId : senderId,
            message : message
        });

        messageObj = await messageObj.save();
        res.status(200).json(messageObj);
    }
    catch(error){
        res.status(500).json({"detail": "Inernal Server Error"});
    }

});



// // get user Chats

router.get("/:chatId", async(req, res)=>{
    
    try{

        const messages = await Message.find({
            chatId : req.params.chatId
        });
        res.status(200).json(messages);
    }
    catch(error){
        res.status(500).json({"detail": "Inernal Server Error"});
    }
});


module.exports = router;