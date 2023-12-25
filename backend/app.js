const express = require("express");
const cookieParser=require('cookie-parser')
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require('dotenv').config();
const authorizationMiddleware = require("./middleware/authorizationMiddleware");
const authenticationMiddleware = require("./middleware/authenticationMiddleware");
const backupDatabaseController = require("./controllers/dbBackupController")
const authRouter = require("./routes/authentication");
const agentRouter = require("./routes/agent");
const knowledgebaseRouter = require("./routes/knowledgebaseRouter");
const adminRouter = require("./routes/adminRouter");
const chatRouter = require("./routes/chatRouter");
const clientRouter = require("./routes/clientRouter");
const managerRouter = require("./routes/manager");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
  })
);

// ! Mongoose Driver Connection
const db_name = process.env.DB_NAME;
const db_url = `${process.env.DB_URL}/${db_name}`;

mongoose
.connect(db_url)
.then(() => console.log("mongoDB connected"))
.catch((e) => {
  console.log(e);
});

// Routes

app.use("/api/v1", authRouter);
app.use(authenticationMiddleware);
app.use("/knowledgebase", knowledgebaseRouter);
app.use("/agent", authorizationMiddleware (['agent']), agentRouter);
// app.use("/client", clientRouter);
app.use("/admin", authorizationMiddleware(['admin']), adminRouter);
app.use("/chat", chatRouter);
app.use("/client", authorizationMiddleware(['client', 'admin', 'agent']), clientRouter);
app.use("/manager", managerRouter);


app.use(function (req, res, next) {
  return res.status(404).send("404");
});

const schedule = require('node-schedule');
//Run every midnight
//The first 0 represents the minute (0-59).
//The second 0 represents the hour (0-23).
//The third 0 represents the day of the month.
//The fourth 0 represents the month.
//The fifth 0 represents the day of the week.
const scheduledJob = schedule.scheduleJob('0 0 * * *', () => {
  backupDatabaseController.updateDatabaseBackup();
  console.log("Database Backed Up Successfully!")
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: ({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
  }),
});

io.on("connection", (socket) => {
  //console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    //console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    //console.log("User Disconnected", socket.id);
  });
});

server.listen(process.env.PORT, () => console.log("server started", process.env.PORT));