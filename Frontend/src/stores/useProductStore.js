import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

export const useProductStore = create((set, get) => ({
  loading: false,
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/v1/products/create-product", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Prouct create successfully");
    } catch (error) {
      toast.error(error.res.data.error);
      set({ loading: false });
    }
  },
}));
