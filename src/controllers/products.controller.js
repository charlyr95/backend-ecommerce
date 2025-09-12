const ProductDao = require("../daos/products.dao");
class ProductsController {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = async (req, res, next) => {
    try {
      const { limit = 10, page = 1, sort, query = {} } = req.query;

      const result = await this.dao.getProducts({
        limit: parseInt(limit),
        page: parseInt(page),
        sort,
        query
      });

      const { products, total, totalPages } = result;
      const hasPrevPage = result.page > 1;
      const hasNextPage = result.page < totalPages;

      const response = {
        status: "success",
        payload: products,
        totalPages,
        prevPage: hasPrevPage ? result.page - 1 : null,
        nextPage: hasNextPage ? result.page + 1 : null,
        page: result.page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? `/api/products?page=${result.page - 1}&limit=${limit}` : null,
        nextLink: hasNextPage ? `/api/products?page=${result.page + 1}&limit=${limit}` : null
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  getProductById = async (req, res, next) => {
    try {
      const product = await this.dao.getProductById(req.params.pid);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  addProduct = async (req, res, next) => {
    try {
      const newProduct = await this.dao.addProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  updateProduct = async (req, res, next) => {
    try {
      const updatedProduct = await this.dao.updateProduct(req.params.pid, req.body);
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  deleteProduct = async (req, res, next) => {
    try {
      await this.dao.deleteProduct(req.params.pid);
      res.status(204).send("Product deleted");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductsController(ProductDao);