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
      const data = await fs.promises.readFile(this.path);
      const carts = JSON.parse(data);
      const newCart = {
        id: carts.length + 1,
        products: products
      };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCarts() {
    if (fs.existsSync(this.path)) {
      const carts = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(carts);
    }
    return [];
  }
}

module.exports = new CartsController("./src/data/carts.json");