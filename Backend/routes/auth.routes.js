import { Router } from "express"
import { getProfile, login, logout, refreshToken, signup } from "../controllers/auth.controller.js"
import { protectedRoute } from "../middleware/auth.middleware.js"
const router = Router()

router.post("/register",signup)
router.get("/logout",logout)
router.post("/login",login)
router.get("/refresh-token",refreshToken)
router.get("/profile",protectedRoute,getProfile)
export default router