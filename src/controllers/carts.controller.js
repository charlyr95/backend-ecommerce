const CartDao = require("../daos/carts.dao");

class CartsController {
  constructor(dao) {
    this.dao = dao;
  }

  getCarts = async (req, res, next) => {
    try {
      const carts = await this.dao.getCarts();
      res.status(200).json(carts);
    } catch (error) {
      next(error);
    }
  }

  getCartById = async (req, res, next) => {
    try {
      const cart = await this.dao.getCartById(req.params.cid);
      if (!cart) return res.status(404).send({ error: "Carrito no encontrado" });
      res.send(cart);
    } catch (error) {
      next(error);
    }
  }

  addCart = async (req, res, next) => {
    try {
      const carts = await this.dao.addCart();
      res.status(201).json(carts);
    } catch (error) {
      next(error);
    }
  }

  addProduct = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      await this.dao.addProductToCart(cid, pid);
      res.status(200).json({ message: `Producto ${pid} agregado al carrito ${cid}` });
    } catch (error) {
      next(error);
    }
  }

  deleteCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      await this.dao.deleteCart(cid);
      res.status(200).json({ message: `Carrito ${cid} eliminado` });
    } catch (error) {
      next(error);
    }
  }

  // TODO: Eliminar esto ---------------------- NUEVO ----------------------
  updateCartProducts = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      await this.dao.updateCartProducts(cid, products);
      res.status(200).json({ message: `Carrito ${cid} productos actualizados` });
    } catch (error) {
      next(error);
    }
  }

  updateProductQuantity = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      await this.dao.updateProductQuantity(cid, pid, quantity);
      res.status(200).json({ message: `Producto ${pid} cantidad actualizada en carrito ${cid}` });
    } catch (error) {
      next(error);
    }
  }

  deleteProduct = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      await this.dao.deleteProduct(cid, pid);
      res.status(200).json({ message: `Producto ${pid} eliminado del carrito ${cid}` });
    } catch (error) {
      next(error);
    }
  }

  clearCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      await this.dao.clearCart(cid);
      res.status(200).json({ message: `Carrito ${cid} vaciado` });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new CartsController(CartDao);