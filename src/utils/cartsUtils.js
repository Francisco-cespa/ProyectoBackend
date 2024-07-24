import { existsSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Obtener dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cartsPath = join(__dirname, "../data/products.json");

export const setCarts = () => {
  if (!existsSync(cartsPath)) {
    writeFileSync(cartsPath, JSON.stringify([]));
  }
  const data = readFileSync(cartsPath, "utf8");
  return JSON.parse(data);
};

export const saveCarts = (carts) => {
  const data = JSON.stringify(carts, null, 2);
  writeFileSync(cartsPath, data);
};
