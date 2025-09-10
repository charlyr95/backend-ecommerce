const router = require("express").Router();
const controller = require("../controllers/products.controller");

router.get("/", controller.getProducts);
router.post("/", controller.addProduct);
router.get("/:pid", controller.getProductById);
router.put("/:pid", controller.updateProduct);
router.delete("/:pid", controller.deleteProduct);

module.exports = router;
