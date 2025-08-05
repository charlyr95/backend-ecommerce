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

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  let quantity = 1;
  if (!req.body) quantity = 1; 
  else if (req.body.quantity) quantity = req.body.quantity; 
  else quantity = 1;
  const product = { id: parseInt(pid), quantity: quantity };
  await cartsController.addProduct(cid, product);
  res.status(200).json(`Added ${quantity} Product id ${pid} to cart id ${cid}`);
});

module.exports = router;
