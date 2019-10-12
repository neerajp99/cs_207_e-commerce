const express = require("express");
const router = express.Router();
const Item = require("../../models/item");
const passport = require("passport");

// @route POST /api/item
// @description Add items
// @access PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    Item.findOne({
      user: req.user.id
    })
      .then(item => {
        //Size has an array of string, so split into array
        if (typeof req.body.size == "undefined") {
          return res.status(400).json("Size is incorrect!");
        }
        const newItem = new Item({
          user: req.user.id,
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          price: req.body.price,
          size: req.body.size.split(",")
        });

        newItem
          .save()
          .then(item => {
            res.json(item);
          })
          .catch(error => {
            res.status(404).json(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
);

// @route GET /api/item
// @description Get all items
// @access PUBLIC
router.get("/", (req, res) => {
  Item.find()
    .then(items => {
      console.log(items)
      if (!items) {
        return res.status(404).json("No items are added yet!");
      }
      res.json(items);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// @route GET /api/item/myItems
// @description Get all items of a specific seller
// @access PRIVATE
router.get(
  "/myItems",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Item.find({
      user: req.user.id
    })

      .then(items => {
        if (!items.length > 0) {
          return res.status(404).json("No items are added yet!");
        }
        res.json(items);
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

// @route GET /api/item/id/:id
// @description Get item by item id
// @access Public
router.get("/id/:id", (req, res) => {
  Item.findOne({
    _id: req.params.id
  })

    .then(item => {
      if (!item) {
        return res.status(404).json("No item found");
      }
      // if item is found
      res.json(item);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

module.exports = router;
