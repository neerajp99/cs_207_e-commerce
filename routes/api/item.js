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
        const newItem = new Item({
          user: req.user.id,
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          price: req.body.price
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

module.exports = router;
