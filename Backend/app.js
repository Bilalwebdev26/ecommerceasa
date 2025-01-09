import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import couponRoutes from "./routes/coupons.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import analyticsRoutes from "./routes/analytics.Routes.js"
const app = express()

// CORS Configuration
app.use(
    cors({
      origin: process.env.FRONTEND_URL, // Allow requests from the frontend URL
      credentials: true, // Allow cookies to be sent with requests
    })
  );

app.use(express.json())//allow you to parse the body of the request
app.use(cookieParser())//allow 
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/products",productRoutes)
app.use("/api/v1/cart",cartRoutes)
app.use("/api/v1/coupons",couponRoutes)
app.use("/api/v1/payments",paymentRoutes)
app.use("/api/v1/analyticsRoutes",analyticsRoutes)

export {app}