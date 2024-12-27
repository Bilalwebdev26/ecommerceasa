import { Router } from "express"
import { login, logout, refreshToken, signup } from "../controllers/auth.controller.js"
const router = Router()

router.post("/register",signup)
router.get("/logout",logout)
router.post("/login",login)
router.get("/refresh-token",refreshToken)
// router.get("/profile",protectedRoute,getProfile)
export default router