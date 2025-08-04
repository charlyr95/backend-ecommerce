const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const errorHandler = require("./middlewares/error.middleware.js");
const productRoutes = require("./routes/products.routes.js");
const cartRoutes = require("./routes/carts.routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
