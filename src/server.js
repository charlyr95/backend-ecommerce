const connectDB = require("./config/db.js");
const path = require("path");
const express = require("express");
const { createServer } = require("http");
const handlebars = require("express-handlebars");

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

const errorHandler = require("./middlewares/error.middleware.js");
const productRoutes = require("./routes/products.routes.js");
const cartRoutes = require("./routes/carts.routes.js");
const viewsRoutes = require("./routes/views.routes.js");

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/", viewsRoutes);
app.use(errorHandler);

connectDB();
httpServer.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
