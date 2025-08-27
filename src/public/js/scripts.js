const socket = io();

const sendToast = (message, type = "success") => {
  Toastify({
    text: message,
    duration: 2000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: type === "success" ? "green" : "red",
  }).showToast();
};

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(document.querySelector("form")));

  await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      socket.emit("update:products");
      document.querySelector("form").reset();
      sendToast("Producto añadido!");
    })
    .catch((error) => {
      sendToast("Error al añadir producto", "red");
    });
});


deleteProduct = async (id) => {
  await fetch(`/api/products/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        sendToast("Error al eliminar producto", "red");
      } else {
        socket.emit("update:products");
        sendToast("Producto eliminado!");
      }
    })
    .catch((error) => {
      sendToast("Error al eliminar producto", "red");
    });
};


socket.on("products", (products) => {
  const productContainer = document.getElementById("productsContainer");
  const productRender = products
    .map((product) => {
      return `<tr>
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.code}</td>
        <td>${product.description}</td>
        <td>$${product.price.toLocaleString("es-AR")}</td>
        <td>${product.stock}</td>
        <td>${product.status}</td>
        <td>${product.category}</td>
        <td><img class="img-thumbnail" style="width: 50px; height: 50px;" src="${product.thumbnails[0]}" onerror="this.onerror=null; this.src='no-image.jpg'" alt="${product.title}" /></td>
        <td><button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${product.id})">Eliminar</button></td>
      </tr>`;
    })
    .join(" ");
  productContainer.innerHTML = productRender;
});

