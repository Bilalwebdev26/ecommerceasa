import {create} from "zustand";
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
      get().calculateTotal()
    } catch (error) {
      set({ cart: [] });
      toast.error(
        error.response.data.message || "Error occured while add to cart"
      );
    }
  },
  addToCart: async (product) => {
    try {
      const res = await axios.post("/v1/cart/addCart", {
        productId: product._id,
      });
      toast.success("Product added to cart",{id:"login"});
      set((prevState) => {
        const existItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existItem
          ? prevState.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotal()
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  calculateTotal: async () => {
    try {
      const { cart, coupon } = get();
      const subTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      let total = subTotal;
      if (coupon) {
        const discount = subTotal + coupon.discountPercent / 100;
        total = subTotal - discount;
        set({ subTotal, total });
      }
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred in Total Calculate");
    }
  },
}));
