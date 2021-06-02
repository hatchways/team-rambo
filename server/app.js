const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const initializeQueue = require('./queue/initialize');

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const fileRouter = require("./routes/file");
const boardsRouter = require("./routes/board");

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

const queue = initializeQueue({
  name: 'rambo',
}, [{ name: 'deadlineReminders', jobHandlerPath: './queue/jobs/deadline.js' }]);

// Passing null data as there is no need to track any data from database.
queue.add('deadlineReminders', null, { cron: '0 0 * * *' }); // everyday at 12am.


const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected");
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/files", fileRouter);
app.use("/boards", boardsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server, queue };
