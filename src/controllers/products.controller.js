const fs = require("fs");
const Product = require("../models/products.model");

class ProductsController {
  constructor(path) {
    this.path = path;
  }
  
  async getProducts() {
    if (fs.existsSync(this.path)) {
      const products = await fs.promises.readFile(this.path, "utf-8");
      if (products.length === 0) return []; // Si el archivo está vacío, retornar un array vacío
      return JSON.parse(products);
    }
    return [];
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === parseInt(id));
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
      product = new Product({ ...product, id: newId });
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      delete updatedFields.id; // Asegurarse de que no se pueda cambiar el id
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === parseInt(id));
      if (index === -1) {
        throw new Error(`Product with id ${id} not found`);
      }
      products[index] = new Product({ ...products[index], ...updatedFields });
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === parseInt(id));
      if (index === -1) {
        throw new Error(`Product with id ${id} not found`);
      }
      products.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new ProductsController("./src/data/products.json");

// id: Number/String (No se manda desde el body, se autogenera para asegurar que nunca se repitan los ids).
// title: String
// description: String
// code: String
// price: Number
// status: Boolean
// stock: Number
// category: String
// thumbnails: Array de Strings
