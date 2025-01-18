import zustand from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";
export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subTotal: 0,

  getCartItem: async () => {
    try {
      const res = await axios.get("/v1/cart/cart-products");
      set({ cart: res.data });
    } catch (error) {
      set({ cart: [] });
      toast.error(
        error.response.data.message || "Error occured while add to cart"
      );
    }
  },
  addToCart:async()=>{
    try {
      const res = await axios.post("/v1/cart/addCart")
    } catch (error) {
        
    }
  }
}));
