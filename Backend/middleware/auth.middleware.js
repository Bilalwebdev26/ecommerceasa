import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.class.js";
import { User } from "../models/User.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new apiError(401, "Unauthorized No-accessToken provided");
    }
    try {
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      if (!decodedToken) {
        throw new apiError(401, "No match Found");
      }
      console.log("Decoded Token in protected auth : ", decodedToken);
      const user = await User.findById(decodedToken.userId).select("-password");
      if (!user) {
        throw new apiError(401, "User not found");
      }
      console.log("User in protected auth : ", user);
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid access Token" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in Protected Route Middleware", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid access Token" });
  }
};

export const adminRoute = async(req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }
    else{
        console.error("Error in Admin Route Middleware:");
        return res.status(403).json({ message: "Only Admin " });
    }
}