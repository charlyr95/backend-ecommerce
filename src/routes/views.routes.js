const router = require("express").Router();
const Products = require("../daos/products.dao");

router.get('/', async (req, res) => { res.render('products') });
router.get('/home', async (req, res) => { res.render('products') });
router.get('/productos', (req, res) => { res.render('products') });
router.get('/products', (req, res) => { res.render('products') });
router.get('/productos/:pid', (req, res) => { res.render('productID', { pid: req.params.pid }) });
router.get('/products/:pid', (req, res) => { res.render('productID', { pid: req.params.pid }) });
router.get('/carts', (req, res) => { res.render('carts') });
router.get('/carrito', (req, res) => { res.render('carts') });

module.exports = router;
