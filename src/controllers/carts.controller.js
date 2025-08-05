const fs = require("fs");
const productsController = require("./products.controller.js");

class CartsController {
  constructor(path) {
    this.path = path;
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === parseInt(id));
      if (!cart) {
        throw new Error(`Cart with id ${id} not found`);
      }
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCart(products) {
    try {
      const carts = await this.getCarts();
      const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
      const newCart = {
        id: newId,
        products: [],
      };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProduct(cart_id, product_id) {
    try {
      const carts = await this.getCarts();
      if (!carts) throw new Error(`Carts not found`);

      const cart = carts.find((c) => c.id === parseInt(cart_id));
      if (!cart) throw new Error(`Cart with id ${cart_id} not found`);

      const product = await productsController.getProductById(product_id);
      console.log(product);
      if (!product) throw new Error(`Product with id ${product_id} not found`);
      
      const existingProduct = cart.products.find((p) => p.product === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ product: product.id, quantity: 1 });
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCarts() {
    if (fs.existsSync(this.path)) {
      const carts = await fs.promises.readFile(this.path, "utf-8");
      if (carts.length === 0) return [];
      return JSON.parse(carts);
    }
    return [];
  }
}

module.exports = new CartsController("./src/data/carts.json");