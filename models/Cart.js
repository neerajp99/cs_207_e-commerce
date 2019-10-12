const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  productId: {
    type: String,
    isRequired: true
  },
  quantity: {
    type: Number,
    min: 1,
    isRequired: true
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema);
