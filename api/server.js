const express = require("express");
const helmet = require("helmet");
const userRouter = require("../users/usersRouter");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1>API IS UP!</h1>`);
});

//Router
server.use("/api", userRouter);

module.exports = server;
