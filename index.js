const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const messagesRoute = require("./routes/messagesRoute.js");
const app = express();
require("dotenv").config();
const socket = require("socket.io");
const path = require("path")

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);

// --------------------------Deployment----------------------------

// app.use(notFound);
// app.use(errorHandler);

const __dirname1 = path.resolve();
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname1,"/client/build")));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname1,"client","build","index.html"));
    })
}else{
    app.get("/", (req,res)=>{
        res.send("API is running successfully");
    });
}


// ------------------------------------------------------------------

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(" db connected successfully")
}). catch((err)=>{
    console.log(err);
})
const server= app.listen(process.env.PORT)
console.log("server started");

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials :true,
    },
})

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        };
    });
});