import express from "express"
import { adminRoute, protectedRoute } from "../middleware/auth.middleware.js"
import { analytics } from "../controllers/analytics.controller.js"
const router = express.Router()

router.get("/analytics",protectedRoute,adminRoute,analytics)

export default router