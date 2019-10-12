const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  productId: {
    type: String,
    isRequired: true
  }
});

module.exports = Wishlist = mongoose.model("wishlist", WishlistSchema);
