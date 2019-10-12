const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Wishlist = require("../../models/Wishlist");
const Profile = require("../../models/Profile");
const Item = require("../../models/Item");

// @route POST /api/wishlist/
// @description post to user wishlist
// @access Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      if (profile) {
        Item.findOne({
          id: req.params.id
        }).then(item => {
          if (item) {
            Wishlist.findOne({
              productId: item.id
            }).then(wish => {
              if (wish) {
                res.status(400).json("Item already there in wishlist");
              }

              const newWish = new Wishlist({
                user: req.user.id,
                productId: item.id
              });

              newWish
                .save()
                .then(productWish => {
                  res.json(productWish);
                })
                .catch(error => {
                  res.status(400).json(error);
                });
            });
          }
        });
      }
    });
  }
);

// @route GET /api/wishlist/
// @description get user's wishlist
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wishlist.find({
      user: req.user.id
    })
      .then(wish => {
        res.json(wish);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  }
);


module.exports = router;
