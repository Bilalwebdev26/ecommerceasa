import {create} from "zustand"
import axios from "../lib/axios.js"
import {toast} from "react-hot-toast"

export const useUserStore = create((set,get)=>({
   user:null,
   loading:false,
   checkingAuth:true,
   signup:async({fullName,email,password,confirmPassword})=>{
       set({loading:true})
       if(password !== confirmPassword){
        set({loading:false})
        return toast.error("Password Not Match")
       }
       try {
        const res = await axios.post("/v1/auth/register",{fullName,email,password})
        set({user:res.data,loading:false})
       } catch (error) {
        set({loading:false})
        toast.error(error.response.data.message || "Error Occurred while SignUp")
       }
   },
   login:async({email,password})=>{
     set({loading:true})
     try {
        const res = await axios.post("/v1/auth/login",{email,password})
        console.log("login user : ",res.data)
        set({user:res.data,loading:false})
     } catch (error) {
        set({loading:false})
        toast.error(error.response.data.message || "Error Occured while login")
     }
   },
   checkauth:async()=>{
        set({checkingAuth:true})
        try {
            const res = await axios.get("/v1/auth/profile")
            set({user:res.data,checkingAuth:false})
        } catch (error) {
            set({user:null,checkingAuth:false})
        }
   },
   Logout:async()=>{
      try {
        const res = await axios.get("/v1/auth/logout")
        set({user:null})
      } catch (error) {
        toast.error(error.res?.data?.message || "An error occurred during logout")
      }
   }
}))
//TODO Implement the axios intercepter for refreshing access token every 15min
