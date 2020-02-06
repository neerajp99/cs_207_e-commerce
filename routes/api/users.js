const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route POST /api/users/register
// @description Register new user
// access PUBLIC
router.post("/register", (req, res) => {
  // bring in errors
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check for validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
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

// @route POST /api/users/login
// @description Login User /Returning JSON Web Tokens
// access PUBLIC
router.post("/login", (req, res) => {
  // bring in errors, if any
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Take email and password
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email
  }).then(user => {
    // Check if user exists
    if (!user) {
      res.status(403).json("There is no user with this email address.");
    }

    // If email address exists, check for the password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // if password is matched
        // create json web token payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        // Sign in
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 4200
          },
          (error, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        res.status(400).json("Incorrect Password");
      }
    });
  });
});

// @route /api/users/current
// @description Get details of the current user
// @access Private (using bearer tokens)
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("lalala");
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
