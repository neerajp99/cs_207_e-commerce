const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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
    max: 1000000,
    required: true
  }
  // details: [
  //   {
  //     specialPrice: {
  //       type: String
  //     },
  //     specialDiscount: {
  //       type: String
  //     }
  //   }
  // ],
  // extraDetails: [
  //   {
  //     highlights: {
  //       type: String
  //     },
  //     services: {
  //       type: String
  //     }
  //   }
  // ]
});

module.exports = Item = mongoose.model("items", ItemSchema);
