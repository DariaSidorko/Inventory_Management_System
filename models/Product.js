
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
      enum: ['black tea', 'green tea', 'oolong tea', 'white tea', 'herbal tea', 'specialty tea'],
      default: 'black',
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
        type: Number,
        default: 0,
      },
      minimum: {
        type: Number,
        default: 1,
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
