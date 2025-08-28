// mongoose schema
const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: { 
    type: String,
    trim: true,
    minlength: { value: 3, message: 'Title must be at least 3 characters long' },
    maxlength: { value: 40, message: 'Title must be at most 40 characters long' },
    required: true 
  },
  description: { 
    type: String, 
    trim: true,
    minlength: { value: 10, message: 'Description must be at least 10 characters long' },
    maxlength: { value: 240, message: 'Description must be at most 240 characters long' },
    required: true 
  },
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  price: { 
    type: Number,
    min: { value: 0, message: 'Price must be positive' },
    max: { value: 999999.99, message: 'Exceeded maximum price' },
    required: true 
  },
  status: { 
    type: Boolean, 
    default: true 
  },
  stock: { 
    type: Number,
    min: { value: 0, message: 'Stock must be positive' },
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

class Product {
  constructor({
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  }) {
    this.id = id;
    this.title = title || "Product title";
    this.description = description || "Product description";
    this.code = code || "";
    this.price = parseInt(price) || 0;
    this.status = Boolean(status) || false;
    this.stock = parseInt(stock) || 0;
    this.category = category || "no category";
    this.thumbnails = thumbnails || [];
  }
}

module.exports = Product;
