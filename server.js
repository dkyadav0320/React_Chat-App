const express = require("express");
const http = require ("http");
const socketIo = require ("socket.io");
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("New User Connected")

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    })

    socket.on("message", (data) => {
        console.log("Message Received:", data);
        io.emit("message", data);    //This will Relay message to all Users
    });
});

server.listen(PORT, () => {
    console.log(`Server is listeming on port ${PORT}`);
});