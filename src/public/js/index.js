const socket = io();

let productID = document.getElementById("productID");
let productTitle = document.getElementById("productTitle");
let productDescription = document.getElementById("productDescription");
let productCode = document.getElementById("productCode");
let productPrice = document.getElementById("productPrice");
let productStock = document.getElementById("productStock");

// socket.emit("message", "Soy la data");

let boton = document.getElementById("btn");

boton.addEventListener("click", () => {
  if (
    productID.value.trim().length > 0 &&
    productTitle.value.trim().length > 0 &&
    productDescription.value.trim().length > 0 &&
    productCode.value.trim().length > 0 &&
    productPrice.value.trim().length > 0 &&
    productStock.value.trim().length > 0
  ) {
    socket.emit("message", {
      id: productID.value,
      title: productTitle.value,
      description: productDescription.value,
      code: productCode.value,
      price: productPrice.value,
      stock: productStock.value,
    });
    console.log(productID.value);
    productID.value = "";
    productTitle.value = "";
    productDescription.value = "";
    productCode.value = "";
    productPrice.value = "";
    productStock.value = "";
  }
});

socket.on("infoProduct", (productList) => {
  let log = document.getElementById("infoProduct");
  log.innerHTML = ""; // Limpiar contenido previo

  // Crear ul
  let ul = document.createElement("ul");

  // Iterar sobre cada producto
  productList.forEach((product) => {
    // Crear li
    let li = document.createElement("li");
    li.innerHTML = `ID: ${product.id}, Title: ${product.title}, Description: ${product.description}, Code: ${product.code}, Price: ${product.price}, Stock: ${product.stock}`;

    // Crear el botón de eliminar
    let button = document.createElement("button");
    button.innerHTML = "Eliminar";

    // Añadir un event listener al botón de eliminar
    button.addEventListener("click", () => {
      ul.removeChild(li);
    });

    // Añadir boton a li
    li.appendChild(button);

    // Añadir ul a la li
    ul.appendChild(li);
  });
  // Añadir la lista desordenada al contenedor
  log.appendChild(ul);
});
