const router = require("express").Router();
const productsController = require("../controllers/products.controller");


router.get("/", async (req, res) => {
  const products = await productsController.getProducts();
  res.status(200).json(products);
});

router.get("/:pid", async (req, res) => {
  const product = await productsController.getProductById(req.params.pid);
  res.status(200).json(product);
});

router.post("/", (req, res) => {
  const product = req.body;
  productsController.addProduct(product);
  res.status(201).send("Product added");
});

router.put("/:pid", async (req, res) => {
  const updatedProduct = await productsController.updateProduct(req.params.pid, req.body);
  res.status(200).send("Product updated");
});

router.delete("/:pid", async (req, res) => {
  await productsController.deleteProduct(req.params.pid);
  res.status(204).send("Product deleted");
});
  
module.exports = router;
