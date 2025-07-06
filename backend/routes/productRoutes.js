import express from "express";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts); // routing to display all products

router.get("/:id", getProduct);  // routing to display a specific product

router.post("/", createProduct); // routing to create a product

router.put("/:id", updateProduct); // routing to update a specific product

router.delete("/:id", deleteProduct); // routing to delete a specific product

export default router;
