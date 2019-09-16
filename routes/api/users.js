const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

// @route POST /api/users/register
// @description Register new user
// access PUBLIC
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      res.status(400).json("User with this email already exists");
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) {
            throw error;
          } else {
            newUser.password = hash;

            //save the credentials to the datbase
            newUser
              .save()
              .then(user => {
                res.json(user);
              })
              .catch(err => {
                console.log(error);
              });
          }
        });
      });
    }
  });
});

module.exports = router;
