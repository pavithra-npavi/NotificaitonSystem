const express = require("express")
const mongoose = require("mongoose")
const app = express()
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
const io = socketio(server);
app.use(express.json())

const connect = require("./configs/db")

const User = require("./models/user.model")

const userController = require("./controllers/user.controllers")


app.use("/",userController)

io.on("connection", (socket) => {
  socket.on("notification", ({ username, pincode, branch, ...obj }) => {
      
    io.emit("notification", { username, pincode, branch, ...obj });
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

io.on("connect_failed", function () {
  document.write("Sorry, there seems to be an issue with the connection!");
});



module.exports ={
    connect,
    app,
}








