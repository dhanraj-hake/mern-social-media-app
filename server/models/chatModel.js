const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
    members: {
        type : Array
    }
},
{timestamps : true}
);

module.exports = mongoose.model("chat", Chat);