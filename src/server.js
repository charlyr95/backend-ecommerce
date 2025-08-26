const path = require("path");
const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const handlebars = require("express-handlebars");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
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
const productsController = require("./controllers/products.controller");

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/", viewsRoutes);

io.on("connection", async (socket) => {
  console.log("New client connected");
  socket.emit("products", await productsController.getProducts());

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("update:products", async () => {
    io.emit("products", await productsController.getProducts());
  });
  
});

app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
