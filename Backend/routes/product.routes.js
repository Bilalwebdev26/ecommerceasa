import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllFeatureProducts,
  getAllProducts,
  getCategoryProduct,
  getRecommendedProduct,
  toggleFeatureProducts,
} from "../controllers/prod.controller.js";
import { adminRoute, protectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create-product", protectedRoute, adminRoute, createProduct);
router.get("/allProducts", protectedRoute, adminRoute, getAllProducts);
router.get("/feature-products", getAllFeatureProducts);
router.get("/recomended-product", getRecommendedProduct);
router.get("/category/:category", getCategoryProduct);
router.delete("/delete-product/:id", protectedRoute, adminRoute, deleteProduct);
router.put("/toggle-featuredProdct/:id",protectedRoute,adminRoute,toggleFeatureProducts)

export default router;
