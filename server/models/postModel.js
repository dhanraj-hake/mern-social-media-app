const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    desc: String,
    likes: [],
    image: String,

},
{ timestamps : true}
);

module.exports = mongoose.model("post", PostSchema);