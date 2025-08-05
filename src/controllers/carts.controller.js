const fs = require("fs");

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
        products: products
          .filter((p) => p.id != null)
          .map((p) => ({ id: p.id, quantity: p.quantity || 1 })),
      };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProduct(id, product) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === parseInt(id));
      if (!cart) {
        console.log(cart);
        throw new Error(`Cart with id ${id} not found`);
      }
      const existingProduct = cart.products.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity || 1;
      } else {
        cart.products.push({ id: product.id, quantity: product.quantity || 1 });
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