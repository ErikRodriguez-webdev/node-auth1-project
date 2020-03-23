const express = require("express");
const Users = require("./usersModel");

const router = express.Router();

router.post("/register", (req, res) => {
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
    .then((response) => {
      res.status(200).json({ username: response.username });
    })
    .catch(() => {
      res.status(500).json({ message: "Invalid Credentials" });
    });
});

router.get("/users", (req, res) => {
  Users.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(400).json({ message: "You shall not pass" });
    });
});

module.exports = router;
