import { Router } from "https://deno.land/x/oak/mod.ts";
import { allProducts,getSingleProduct, createProduct, updateProduct, deleteProduct } from "./controllers/ProductController.ts";

const router = new Router();

router
  .get("/api/products", allProducts)
  .get("/api/products/:id", getSingleProduct)
  .post("/api/products", createProduct)
  .put("/api/products/:id", updateProduct)
  .delete("/api/products/:id", deleteProduct)

export default router;
