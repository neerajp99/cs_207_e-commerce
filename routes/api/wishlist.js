const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Wishlist = require("../../models/Wishlist");

// @route POST /api/wishlist/
// @description post to user wishlist
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.id);
    Wishlist.findOne({
      productId: req.body.id
    }).then(wish => {
      if (wish) {
        return res.status(400).json("Item already there in wishlist");
      } else {
        const newWish = new Wishlist({
          user: req.user.id,
          productId: req.body.id
        });

        newWish
          .save()
          .then(productWish => {
            res.json(productWish);
          })
          .catch(error => {
            res.status(400).json(error);
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
