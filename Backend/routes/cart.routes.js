import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  addCart,
  getAllCartProducts,
  removeProductFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
const router = express.Router();

router.get("/cart-products", protectedRoute, getAllCartProducts);
router.post("/", protectedRoute, addCart);
router.delete("/delete-product", protectedRoute, removeProductFromCart);
router.put("/update-quantity/:id", protectedRoute, updateQuantity);

export default router;
