const router = require("express").Router();
const ProductsController = require("../controllers/products.controller");

router.get('/', async (req, res) => {
    res.render('home', { products: await ProductsController.getProducts() })
});

router.get('/home', async (req, res) => {
    res.render('home', { products: await ProductsController.getProducts() })
});

router.get('/productos', (req, res) => {
    res.render('products')
});

router.get('/products', (req, res) => {
    res.render('products')
});

router.get('/realtimeproducts', (req, res) => {
    res.render('products')
});

module.exports = router;
