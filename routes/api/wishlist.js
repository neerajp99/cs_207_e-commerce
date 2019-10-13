const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Wishlist = require("../../models/Wishlist");
const Cart = require("../../models/Cart");

// @route POST /api/wishlist/
// @description post to user wishlist
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.id);
    const updateFields = {};
    updateFields.user = req.user.id;

    if (req.body.productId) {
      updateFields.productId = req.body.productId;
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

    Wishlist.findOne({
      productId: req.body.id
    }).then(wish => {
      if (wish) {
        return res.status(400).json("Item already there in wishlist");
      } else {
        new Wishlist(updateFields)
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

// @route DELETE api/wishlist/:cart_id
// @description Delete wishlist item
// @access Private
router.delete(
  "/:wishlist_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wishlist.deleteOne({ productId: req.params.wishlist_id }, error => {
      if (!error) {
        Wishlist.find({ user: req.user.id }).then(product => {
          res.json(product);
        });
      } else {
        return res.status(400).json(error);
      }
    });
  }
);

// @route DELETE api/wishlist/:cart_id
// @description Move wishlist item to cart and remove from wishlist
// @access Private
router.delete(
  "/moveToCart/:wishlist_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wishlist.findOne({
      productId: req.params.wishlist_id
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

      Cart.findOne({
        productId: req.params.wishlist_id
      })
        .then(cart => {
          if (!cart) {
            new Cart(updateFields)

              .save()
              .then(productCart => {
                res.json(productCart);
              })
              .then(() => {
                Wishlist.deleteOne(
                  { productId: req.params.wishlist_id },
                  error => {
                    if (!error) {
                      Wishlist.find({ user: req.user.id }).then(product => {
                        res.json(product);
                      });
                    } else {
                      return res.status(400).json(error);
                    }
                  }
                );
              })

              .catch(error => {
                console.log("hahahhaa");
                res.status(400).json(error);
              });
          } else {
            return res.status(400).json("Item already present in wishlist!");
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
