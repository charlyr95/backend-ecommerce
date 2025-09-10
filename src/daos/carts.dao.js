const Cart = require("./models/carts.model");
const Product = require("./models/products.model");

class CartsDao {
  constructor(cart, product) {
    this.model = cart;
    this.model.product = product; // Acceso al modelo de productos
  }

  async getCarts() {
    try {
      return await this.model.find().populate("products.product");
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      return await this.model.findById(id).populate("products.product");
    } catch (error) {
      throw error;
    }
  }

  async addCart() {
    try {
      const newCart = new this.model();
      return await newCart.save();
    } catch (error) {
      throw error;
    }
  }

  async updateCart(id, updatedFields) {
    try {
      return await this.model.findByIdAndUpdate(id, updatedFields, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await this.model.findById(cartId); // Buscamos el carrito
      if (!cart) throw new Error('Carrito no encontrado');

      const product = await this.model.product.findById(productId); // Verificamos que el producto exista
      if (!product) throw new Error('Producto no encontrado');

      const existingProduct = cart.products.find(
        p => p.product.toString() === productId // Verificamos si el producto ya está en el carrito
      );

      if (existingProduct) {
        existingProduct.quantity += quantity; // Si ya existe, sumamos la cantidad
      } else {
        cart.products.push({ product: productId, quantity }); // Si no existe, lo agregamos
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  } 

  async deleteCart(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  // TODO: Eliminar esto ---------------------- NUEVO ----------------------
  async updateCartProducts(cartId, products) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");

      // validar productos
      for (const item of products) {
        const exists = await this.model.product.findById(item.product);
        if (!exists) throw new Error(`Producto no encontrado: ${item.product}`);
      }

      cart.products = products; // reemplaza con el array recibido
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      if (quantity < 1) throw new Error("La cantidad debe ser al menos 1");

      const cart = await this.model.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");

      const product = cart.products.find(
        (p) => p.product.toString() === productId
      );
      if (!product) throw new Error("Producto no está en el carrito");

      product.quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(cartId, productId) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");

      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId
      );

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartsDao(Cart, Product);
