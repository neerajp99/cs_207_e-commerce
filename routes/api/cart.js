const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Cart = require("../../models/Cart");
const Item = require("../../models/Item");
// const object = []

// @route POST /api/wishlist/
// @description post to user wishlist
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const updateFields = {};
    updateFields.user = req.user.id;

    if (req.body.productId) {
      updateFields.productId = req.body.productId;
    }
    if (req.body.quantity) {
      updateFields.quantity = req.body.quantity;
    }

    updateFields.product = {};
    if (req.body.name) {
      updateFields.product.name = req.body.name;
    }
    if (req.body.description) {
      updateFields.product.description = req.body.description;
    }
    if (req.body.size) {
      updateFields.product.size = req.body.size.split(",");
    }
    if (req.body.category) {
      updateFields.product.category = req.body.category;
    }
    if (req.body.price) {
      updateFields.product.price = req.body.price;
    }

    Cart.findOne({
      productId: req.body.id
    })
      .then(cart => {
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
          )
            .then(carts => {
              res.json(carts);
            })
            .catch(error => {
              res.status(400).json(error);
            });
        } else {
          new Cart(updateFields)

            .save()
            .then(productCart => {
              res.json(productCart);
            })
            .catch(error => {
              res.status(400).json(error);
            });
        }
      })
      .catch(error => {
        res.status(400).json(error);
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
      .then(product => {
        if (!product) {
          return res.status(400).json("No product in the cart!");
        } else {
          res.json(product);
        }
      })
      .catch(error => {
        res.status(400).json(error);
      });
  }
);

// @route DELETE api/cart/:cart_id
// @description Delete cart item
// @access Private
router.delete(
  "/:cart_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Cart.deleteOne({ productId: req.params.cart_id }, error => {
      if (!error) {
        Cart.find({ user: req.user.id }).then(product => {
          res.json(product);
        });
      } else {
        return res.status(400).json(error);
      }
    });
  }
);

// @route DELETE api/cart/:cart_id
// @description Move cart item to wishlist and remove from cart
// @access Private
router.delete(
  "/moveToWishlist/:cart_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Cart.findOne({
      productId: req.params.cart_id
    }).then(wish => {
      const updateFields = {};
      updateFields.user = req.user.id;

      updateFields.productId = wish.productId;

      updateFields.quantity = 1;

      updateFields.product = {};

      updateFields.product.name = wish.product.name;

      updateFields.product.description = wish.product.description;

      updateFields.product.size = wish.product.size;

      updateFields.product.category = wish.product.category;

      updateFields.product.price = wish.product.price;

      Wishlist.findOne({
        productId: req.params.cart_id
      })
        .then(cart => {
          if (!cart) {
            new Wishlist(updateFields)
              .save()
              .then(productCart => {
                res.json(productCart);
              })
              .then(() => {
                Cart.deleteOne({ productId: req.params.cart_id }, error => {
                  if (!error) {
                    Cart.find({ user: req.user.id }).then(product => {
                      res.json(product);
                    });
                  } else {
                    return res.status(400).json(error);
                  }
                });
              })

              .catch(error => {
                console.log("hahahhaa");
                res.status(400).json(error);
              });
          } else {
            return res.status(400).json("Item already present in cart!");
          }
        })
        .catch(error => {
          console.log("jajajaajhaa");
          res.status(400).json(error);
        });
    });
  }
);

module.exports = router;
