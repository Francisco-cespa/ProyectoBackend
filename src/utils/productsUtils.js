import { existsSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Obtener dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const productsPath = join(__dirname, "../data/products.json");

export const setProducts = () => {
  if (!existsSync(productsPath)) {
    writeFileSync(productsPath, JSON.stringify([]));
  }
  const data = readFileSync(productsPath, "utf8");
  return JSON.parse(data);
};

export const saveProducts = (products) => {
  const data = JSON.stringify(products, null, 2);
  writeFileSync(productsPath, data);
};
