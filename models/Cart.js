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
  },
  product: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      min: 0,
      required: true
    },
    size: {
      type: [String],
      required: true
    }
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema);
