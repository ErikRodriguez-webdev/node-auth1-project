const express = require("express");
const Users = require("./usersModel");
const bcrypt = require("bcryptjs");
const restricted = require("../auth/restricted-middleware");

const router = express.Router();

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(req.body)
    .then(() => {
      res.status(201).json({ message: "successfully created an account." });
    })
    .catch(() => {
      res.status(500).json({ message: "Error when adding user." });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then((user) => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        };
        console.log("its here", req.session.user);
        res.status(200).json({ username: user.username });
      } else {
        res.status(401).json({ message: "User is not authorized." });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Invalid Credentials" });
    });
});

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(400).json({ message: "You shall not pass" });
    });
});

module.exports = router;
