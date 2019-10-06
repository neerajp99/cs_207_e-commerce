const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route POST /api/profile/
// @description Cretae user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // object to store profile details
    const profileData = {};
    profileData.user = req.user.id;

    if (req.body.handle) {
      profileData.handle = req.body.handle;
    }
    if (req.body.organisation) {
      profileData.organisation = req.body.organisation;
    }
    if (req.body.bio) {
      profileData.bio = req.body.bio;
    }

    // social links goes here
    profileData.social = {};
    if (req.body.facebook) {
      profileData.social.facebook = req.body.facebook;
    }
    if (req.body.twitter) {
      profileData.social.twitter = req.body.twitter;
    }
    if (req.body.instagram) {
      profileData.social.linkedin = req.body.linkedin;
    }

    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        if (profile) {
          // If profile exists, update it
          Profile.findOneAndUpdate(
            {
              user: req.user.id
            },
            {
              $set: profileData
            },
            {
              new: true
            }
          )
            .then(profile => {
              res.json(profile);
            })
            .catch(error => {
              res.json(error);
            });
        } else {
          // if profile is not found, create new profile fields
          Profile.findOne({
            handle: profileData.handle
          })
            .then(profile => {
              if (profile) {
                res.status(400).json("User with this handle already exists");
              }
              // Otherwise save the new profile
              new Profile(profileData)
                .save()
                .then(profile => {
                  res.json(profile);
                })
                .catch(error => {
                  res.json(error);
                });
            })
            .catch(error => {
              res.json(error);
            });
        }
      })
      .catch(error => {
        res.json(error);
      });
  }
);

// @route GET /api/profile
// @descriptionGet current profile
// @access PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.id);
    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name"])
      .then(profile => {
        console.log(profile);
        if (!profile) {
          return res.status(404).json("No profile exists!");
        }
        res.json(profile);
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

// @route GET /api/profile/handle/:handle
// @description Get user profile by handle
// @access Public
router.get("/handle/:handle", (req, res) => {
  Profile.findOne({
    handle: req.params.handle
  })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        return res.status(404).json("No profile found");
      }

      // if profile is found
      res.json(profile);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// @route GET /api/profile/user/:user_id
// @description Get user profile by user id
// @access Public
router.get("/user/:user_id", (req, res) => {
  Profile.findOne({
    user: req.params.user_id
  })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        res.status(404).json("No profile found");
      }

      // if profile is found
      res.json(profile);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

module.exports = router;
