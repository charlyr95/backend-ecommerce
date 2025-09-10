const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cartSchema = new Schema({
  products: [{
    _id: false,
    product: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    quantity: { 
      type: Number, 
      min: 1, 
      default: 1 
    }
  }]
}, { timestamps: true });

module.exports = model('Cart', cartSchema);