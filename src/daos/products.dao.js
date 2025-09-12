const Product = require("./models/products.model");

class ProductsDao {
  constructor(model) {
    this.model = model;
  }

  async getProducts({ limit = 10, page = 1, sort, query} = {}) {
    try {
      // expected filter: {"category":"calzado","price":{"$gte":45000}}
      if (query && typeof query === "string") {
        query = JSON.parse(query);
      }
      const filter = query ? { ...query } : {};

      const sortOption = sort ? { price: sort === "asc" ? 1 : -1 } : {};
      const skip = (page - 1) * limit;

      const products = await this.model.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
      const total = await this.model.countDocuments(filter);

      return {
        products,
        total,
        totalPages: Math.ceil(total / limit),
        page,
        limit
      };
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async addProduct(product) {
    try {
      const newProduct = new this.model(product);
      return await newProduct.save();
    } catch (error) {
      throw error;
    }
  }

  async addProducts(products) {
    try {
      const newProducts = products.map(product => new this.model(product));
      return await this.model.insertMany(newProducts);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      return await this.model.findByIdAndUpdate(id, updatedFields, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductsDao(Product);
