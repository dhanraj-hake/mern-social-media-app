const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dotenv = require("dotenv");

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const uploadImageRouter = require("./routers/uploadPostImage");
const chatRouter = require("./routers/chatRouter");
const messageRouter = require("./routers/messageRouter");

dotenv.config()

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(cors())

app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", ()=>{
    console.log("Error on Connecting Mongoose");
});

db.once("open", ()=>{
    console.log("Connected to MongoDb");
});



app.get("/", (req, res)=>{
    res.status(200).json({"details":"Social Media API"});
})


app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/uploadimage", uploadImageRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);



app.listen(PORT, ()=>{
    console.log("Servser Running on http://127.0.0.1:"+PORT)
});


