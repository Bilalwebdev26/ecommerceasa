import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import couponRoutes from "./routes/coupons.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
const app = express()

app.use(express.json())//allow you to parse the body of the request
app.use(cookieParser())//allow 
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/products",productRoutes)
app.use("/api/v1/cart",cartRoutes)
app.use("/api/v1/coupons",couponRoutes)
app.use("/api/v1/payments",paymentRoutes)

export {app}