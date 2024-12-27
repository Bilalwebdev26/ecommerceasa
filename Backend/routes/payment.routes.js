import express from "express"
import { protectedRoute } from "../middleware/auth.middleware.js"
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js"
const router = express.Router()

router.post("/create-checkoiy-session",protectedRoute,createCheckoutSession)
router.post("/create-success",protectedRoute,checkoutSuccess)

export default router