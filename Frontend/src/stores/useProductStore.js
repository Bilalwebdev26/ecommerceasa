import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios.js";

export const useProductStore = create((set, get) => ({
  loading: false,
  products: [],
  setProducts: (products) => set({ products }),

  // createProduct: async ({name,description,price,image,category}) => {
  //   set({ loading: true });
  //   try {
  //     const res = await axios.post("/v1/products/create-product", {name,description,price,image,category});
  //     console.log("Product Data in useProduct : ",productData)
  //     set((prevState) => ({
  //       products: [...prevState.products, res.data],
  //       loading: false,
  //     }));
  //     toast.success("Prouct create successfully");
  //   } catch (error) {
  //     toast.error(error.res.data.error);
  //     set({ loading: false });
  //   }
  // },
  createProduct: async ({ name, description, price, image, category }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/v1/products/create-product", {
        name,
        description,
        price,
        image,
        category,
      });
      console.log("Product Data in useProduct:", res.data);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", error);
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred";
      toast.error(errorMessage);
      set({ loading: false });
    }
  },
  
}));
