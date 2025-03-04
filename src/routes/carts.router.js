import { Router } from "express";
const router = Router();
import { saveCarts, setCarts } from "../utils/cartsUtils.js";

let carts = setCarts();
setCarts();

//get
router.get("/", (req, res) => {
  res.status(200).json(carts);
  if (carts) {
    res.status(200).json(carts);
  } else {
    res.status(400).json("no se encontro el carrito");
  }
});

router.get("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = carts.find((cart) => cart.id === cartId);

  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(400).json({
      message: "El carrito solicitado no encontrado",
    });
  }
});

// post
router.post("/", (req, res) => {
  const { products } = req.body;
  let maxId = 0;
  if (carts.length > 0) {
    maxId = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
  }
  const newCart = {
    id: maxId + 1,
    products: products || [],
  };

  carts.push(newCart);
  saveCarts(carts);
  res.status(200).json(newCart);
});

//delete cart

router.delete("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  carts = carts.filter((cart) => cart.id !== cartId);
  saveCarts(carts);
  res.status(200).json({
    message: `Carrito con id: ${cartId}, se ha eliminado correctamente!`,
  });
});

//delete product del cart

router.delete("/:cid/product/:pid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const cart = carts.find((cart) => cart.id === cartId);
  const prod = cart.products.find((product) => product.id === productId);

  //validacion de carrito
  if (!cart) {
    return res
      .status(404)
      .json({ message: `!!! Carrito (ID: ${cartId}) no encontrado` });
  } else if (!prod) {
    //validacion de producto dentro del carrito
    return res.status(404).json({
      message: `!!! Producto (ID: ${productId}) no se encuentra en el carrito (ID: ${cartId})`,
    });
  }

  // index del carrito
  let indexCart = carts.findIndex((i) => i.id === cartId);
  // filtramos el carro sin el producto a eliminar
  let filteredCart = cart.products.filter(
    (product) => product.id !== productId
  );

  //cambiamos el valor del products
  carts[indexCart].products = filteredCart;

  saveCarts(carts);

  res.status(200).json({
    message: `Producto (ID:${productId}) eliminado del carrito (ID: ${cartId}) correctamente!`,
  });
});

export default router;
