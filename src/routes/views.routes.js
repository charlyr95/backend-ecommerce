const router = require("express").Router();
const Products = require("../daos/products.dao");

router.get('/', async (req, res) => {
    const dbProducts = await Products.getProducts();
    const products = dbProducts.map(p => p.toObject());
    res.render('home', {products})
});

router.get('/home', async (req, res) => {
    const dbProducts = await Products.getProducts();
    const products = dbProducts.products.map(p => p.toObject ? p.toObject() : p);
    res.render('home', {products})
});

// router.get('/productos', (req, res) => {
//     res.render('products')
// });

// router.get('/products', (req, res) => {
//     res.render('products')
// });

// router.get('/realtimeproducts', (req, res) => {
//     res.render('products')
// });

module.exports = router;
