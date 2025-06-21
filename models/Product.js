
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      maxlength: 50,
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
      maxlength: 100,
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
        type: Number,
        default: 0,
      },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
