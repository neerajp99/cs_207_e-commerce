const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Cart = require("../../models/Cart");


// @route POST /api/wishlist/
// @description post to user wishlist
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const updateFields = {};

    if (req.body.productId) {
      updateFields.productId = req.body.productId;
    }
    if (req.body.quantity) {
      updateFields.quantity = req.body.quantity;
    }

    Cart.findOne({
      productId: req.body.id
    }).then(cart => {
      if (cart) {
        Cart.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: updateFields
          },
          {
            new: true
          }
        ).then(cart => {
          res.json(cart);
        });
      } else {
        const newCart = new Cart({
          user: req.user.id,
          productId: req.body.id,
          quantity: req.body.quantity
        });

        newCart
          .save()
          .then(productCart => {
            res.json(productCart);
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
    Cart.find({
      user: req.user.id
    })
      .then(cart => {
        res.json(cart);
      })
      .catch(error => {
        return res.status(400).json(error);
      });
  }
);

module.exports = router;
