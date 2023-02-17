
const io = require('socket.io')(5000, {
    cors: {
        origin: '*'
    }
});


let onlineUsers = [];

io.on("connection", (socket)=>{
    
    socket.on("add-new-user", (userId)=>{

        if(!onlineUsers.some((user)=>user.userId === userId)){
            onlineUsers.push({
                userId: userId,
                socketId : socket.id
            });
            console.log("Added user");
            io.emit("get-users", onlineUsers);
        }

    });

    socket.on("send-message", (data)=>{

        const user = onlineUsers.find(user=>user.userId === data.userId);

        console.log("data ", data);

        if(user){
            io.to(user.socketId).emit("recieve-message", data);
        }

    });


    socket.on("disconnect", ()=>{
        onlineUsers = onlineUsers.filter((user)=>{
            return user.socketId!== socket.id;
        });

        io.emit("get-users", onlineUsers);
        console.log("disconnected", socket.id)
    });
    
})