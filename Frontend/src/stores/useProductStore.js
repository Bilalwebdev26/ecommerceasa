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
  fetchProduct:async()=>{
   set({loading:true})
   try {
    const res = await axios.get("/v1/products/allProducts")
    set({products:res.data.products,loading:false})
   } catch (error) {
    set({error:"Failed to fetch Products",loading:false})
    toast.error(error.response?.data?.error || "Failed to fetch All Products") 
   }
  },
  deleteProduct:async(productId)=>{
    set({loading:true})
    try {
      const res = await axios.delete(`/v1/products/delete-product/${productId}`)
      set((prevState)=>({
        products:prevState.products.filter((product)=> product._id !== productId),
        loading:false
      }))
    } catch (error) {
      set({loading:false})
      toast.error(error.response.data.error || "Failed to delete Product")
    }
  },
  toggleFeatureProduct:async(productId)=>{
    set({loading:true})
    try {
    const res = await axios.put(`/v1/products/toggle-featuredProdct/${productId}`)
    set((prevState)=>({
      products:prevState.products.map((product)=>
      product._id === productId ? {...product,isFeatured : res.data.isFeatured}:product
      ),
      loading:false
    }))
    } catch (error) {
      set({loading:false});
      toast.error(error.response.data.error || "Failed to update product")
    }
  },
  getProductByCategory:async(category)=>{
    set({loading:true})
    try {
      const res = await axios.get(`/v1/products/category/${category}`)
      set({products:res.data.products,loading:false})
    } catch (error) {
      set({loading:false,error:"Failed to Fetch Product"})
        toast.error(error.response.data.error|| "Failed to Fetch Product")
    } 
  }
}));
