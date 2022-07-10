const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const connectRouter = require("./routers/connect");

const app = express();
const port = process.env.PORT;

// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

app.use(express.json());
app.use(cors());
app.use("/connect", connectRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Wtih, Content-Type, Accept"
  );
  next();
});

// const socketRouter = require("./routers/SocketRouter")(io);
// app.use("/socket", socketRouter);

// // socket connection
// io.on("connection", (socket) => {
//   console.log(socket.id);
// });

app.listen(port, () => {
  console.log("Server up on port " + port);
});
