const app = require("./app");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const workSpaceRoutes = require("./routes/workspaceRoute");
const channelRoutes = require("./routes/channelRoutes");
const http = require("http");
const socketIO = require("socket.io");
const { logger } = require("./services/winston");
const messageRoutes = require("./routes/messageRoutes")

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true
  }
});


// Routes
app.get("/", (req, res) => {
  res.status(200).send("Server is listening...");
});

app.use("/api/user", userRoutes);
app.use("/api/workspace", workSpaceRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6090;
server.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port:${process.env.PORT}`
      .green.bold
  );
});


// Socket.io event listeners
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected");
  logger.info(`user connected with socketId ${socket.id}`);

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} is registered`);
  });
  //  in data send msg and to userId
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-recieve", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // Remove the disconnected user from onlineUsers map
    onlineUsers.forEach((socketId, userId) => {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`User ${userId} is disconnected and removed from onlineUsers`);
      }
    });
  });
});