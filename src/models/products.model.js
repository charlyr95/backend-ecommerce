class Product {
    constructor({id, title, description, code, price, status, stock, category, thumbnails}) {
        this.id = id;
        this.title = title || "Product title";
        this.description = description || "Product description";
        this.code = code || "";
        this.price = parseInt(price) || 0;
        this.status = Boolean(status) || false;
        this.stock = parseInt(stock) || 0;
        this.category = category || "no category";
        this.thumbnails = thumbnails || [];
    }
}

module.exports = Product;