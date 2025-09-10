const router = require("express").Router();
const controller = require("../controllers/carts.controller");

router.get("/", controller.getCarts);
router.get("/:cid", controller.getCartById);
router.post("/", controller.addCart);
router.post("/:cid/product/:pid", controller.addProduct);

// TODO: Verificar con postman
router.delete("/:cid/product/:pid", controller.deleteProduct);
router.put("/:cid", controller.updateCartProducts);
router.put("/:cid/product/:pid", controller.updateProductQuantity);
router.delete("/:cid", controller.clearCart);

module.exports = router;
