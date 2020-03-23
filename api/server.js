const express = require("express");
const helmet = require("helmet");
const userRouter = require("../users/usersRouter");
const session = require("express-session");

const server = express();

const sessionConfig = {
  name: "cookie",
  secret: "keep a secret",
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.get("/", (req, res) => {
  res.send(`<h1>API IS UP!</h1>`);
});

//Router
server.use("/api", userRouter);

module.exports = server;
