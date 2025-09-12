// easy message function with Toastify
const sendToast = (message, type = "success") => {
  Toastify({
    text: message,
    duration: 2000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: type === "success" ? "green" : "red",
    },
  }).showToast();
};

// main function to add a product to the cart
function addToCart(pid) {
  getCart().then(cart => {
    addProductToCart(cart._id, pid);
  }).catch(error => {
    sendToast("Error al obtener el carrito", "red");
  });
};


async function addProductToCart(cid, pid) {
  try {
    const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "POST",
    });

    if (!response.ok) {
      sendToast("Error al agregar producto al carrito", "red");
    } else {
      sendToast("Producto agregado al carrito!");
    }
  } catch (error) {
    sendToast("Error al agregar producto al carrito", "red");
  }
}



// Intenta obtener el carrito del localStorage, verifica con la db y sino crea uno nuevo
async function getCart() {
  try {
    const cart = await loadCartFromLocalStorage();
    if (!cart) return createNewCart();
    const validate = await getCartById(cart._id);
    if (!validate) return createNewCart();
    return validate;
  } catch (error) {
    return null;
  }
}

// get cart from localstorage
async function loadCartFromLocalStorage() {
  const cart = localStorage.getItem("cart");
  if (!cart) return null;
  const parsedCart = JSON.parse(cart);
  return parsedCart;
}

// create a new cart in the database
async function createNewCart() {
  try {
    const response = await fetch("/api/carts", { method: "POST" });
    if (!response.ok) return null;
    const cart = await response.json();
    await saveCart(cart);
    return cart;
  } catch (error) {
    return null;
  }
}

// save to localStorage
async function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// check cart from database by id
async function getCartById(id) {
  try {
    const response = await fetch(`/api/carts/${id}`);
    if (!response.ok) return null;
    const cart = await response.json();
    return cart;
  } catch (error) {
    return null;
  }
};
