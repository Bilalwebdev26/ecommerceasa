import { redis } from "../db/redis.js";
import { User } from "../models/User.model.js";
import { apiError } from "../utils/apiError.class.js";
import { apiResponse } from "../utils/apiResponse.class.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId)=>{
    const accessToken = jwt.sign(
      {userId},
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn:"15m"
      }
    )
    const refreshToken = jwt.sign(
      {userId},
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:"7d"
      }
    )
    return {accessToken,refreshToken}
}

const storeRefreshToken = async(userId,refreshToken)=>{
 await redis.set(`refresh_token:${userId}`,refreshToken,"EX",7*24*60*60*1000)//7days
}

const setCookie = (res,accessToken,refreshToken)=>{
  res.cookie("accessToken",accessToken,{
    httpOnly:true,//prevent XSS attacks , cross site scripting attacks
    secure:process.env.NODE_ENV === "production",
    sameSite:"strict",//prevent CSRF attacks,cross-site request forgery attacks
    maxAge:15*60*1000,//15mins
  })
  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,//prevent XSS attacks , cross site scripting attacks
    secure:process.env.NODE_ENV === "production",
    sameSite:"strict",//prevent CSRF attacks,cross-site request forgery attacks
    maxAge:7*24*60*60*1000,//7days
  })

}

export const signup = async(req,res)=>{
  const{email,password,fullName}=req.body;
  try {
    if(!fullName || !email || !password){
        throw new apiError(401,"All Fields are Requireds")
    }
    const userExist = await User.findOne({email})
    if(userExist){
        throw new apiError(400,"Email ALready exist")
    }
    const user = await User.create({
        fullName,
        email,
        password
    })
    const {accessToken,refreshToken} = generateTokens(user._id)
    await storeRefreshToken(user._id,refreshToken)
    setCookie(res,accessToken,refreshToken)
    return res.status(200).json(new apiResponse(201,"User Created SuccessFully",user))
  } catch (error) {
    console.log("error ",error)
    return res.status(500).json({message:error.message})
  }
} 
export const logout = async(req,res)=>{
  try {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
      const decodedToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
      console.log("Decoded token",decodedToken)
      const res = await redis.del(`refresh_token:${decodedToken.userId}`)
      console.log("Res : ",res)
    }
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    res.json(new apiResponse(201,"User Logout Successfully",{}))
  } catch (error) {
    res.status(500).json({message:"Server error",error:error.message})
  } 
}
export const login = async(req,res)=>{
  try {
    const{email,password}=req.body
    const user = await User.findOne({email})
    if(!user){
      throw new apiError(401,"Email not found")
    }
    if(user && (await user.isPassCorrect(password))){
      const{accessToken,refreshToken} =  generateTokens(user._id)
      await storeRefreshToken(user._id,refreshToken)
      setCookie(res,accessToken,refreshToken)
       res.status(200).json(new apiResponse(201,"User Login SuccessFully",{
        _id:user._id,
        email:user.email,
        fullName:user.fullName,
        role:user.role
      }))
    }else{
      res.status(401).json({message:"Invalid Creadentials"})
    }
  } catch (error) {
    res.status(500).json({message:"Server error",error:error.message})
  }
}
export const refreshToken = async(req,res)=>{
   try {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
      throw new apiError(401,"No refreshToken")
    }
    const decodedToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    const storedToken = await redis.get(`refresh_token:${decodedToken.userId}`)
    if(storedToken !== refreshToken){
      throw new apiError(401,"Invalid or Unauthorized token")
    }
    const accessToken = jwt.sign({userId:decodedToken.userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15min"})
    res.cookie("accessToken",accessToken,{
      httpOnly:true,//prevent XSS attacks , cross site scripting attacks
      secure:process.env.NODE_ENV === "production",
      sameSite:"strict",//prevent CSRF attacks,cross-site request forgery attacks
      maxAge:15*60*1000,//15mins
    })
    res.json({message:"Access Token Refresh SuccessFully"})
   } catch (error) {
    res.status(500).json({message:"Server error",error:error.message})
   }
}
// export const getProfile = async(req,res)=>{
   
// }