const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { 
    type: String,
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [40, 'Title must be at most 40 characters long'],
    required: true 
  },
  description: { 
    type: String, 
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [240, 'Description must be at most 240 characters long'],
    required: true 
  },
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  price: { 
    type: Number,
    min: [0, 'Price must be positive'],
    max: [999999.99, 'Exceeded maximum price'],
    required: true 
  },
  status: { 
    type: Boolean, 
    default: true 
  },
  stock: { 
    type: Number,
    min: [0, 'Stock must be positive'],
    default: 0
  },
  category: { 
    type: String, 
    default: "no category" 
  },
  thumbnails: { 
    type: [String], 
    default: [] 
  },
});

module.exports = model('Product', productSchema);
