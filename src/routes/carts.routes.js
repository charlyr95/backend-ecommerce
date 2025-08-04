const router = require("express").Router();
const cartsController = require("../controllers/carts.controller");

router.post("/", (req, res) => {
  const products = req.body;
  cartsController.addCart(products);
  res.status(201).send("Cart added");
});

router.get("/:cid", async (req, res) => {
  const cart = await cartsController.getCartById(req.params.cid);
  res.status(200).json(cart);
});

// router.post("/:cid/product/:pid", async (req, res) => {
//   const products = await cartsController.getProducts();
//   res.status(200).json(products);
// });

module.exports = router;
