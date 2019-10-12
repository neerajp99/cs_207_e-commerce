const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const Item = require("../../models/Item");
const Cart = require("../../models/Cart");

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
            Cart.findOne({
              productId: item.id
            }).then(cart => {
              if (cart) {
                res.status(400).json("Item already there in cart");
              }

              const newCart = new Cart({
                user: req.user.id,
                productId: item.id,
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
    Cart.find({
      user: req.user.id
    })
      .then(cart => {
        if (cart) {
          Item.find({
            user: req.user.id
          })
            .then(cartProducts => {
              res.json(cartProducts);
            })
            .catch(error => {
              res.status(400).json(error);
            });
        }
        res.json(cart);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  }
);

module.exports = router;
