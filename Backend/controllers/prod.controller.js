import { redis } from "../db/redis.js";
import { Product } from "../models/Product.model.js";
import { apiError } from "../utils/apiError.class.js";
import cloudinary from "../utils/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); //find all products
    res.json({ products });
  } catch (error) {
    console.log("Error in ALL PRODUCT controller : ", error.message);
  }
};
export const getAllFeatureProducts = async (req, res) => {
  try {
    let featureProducts = await redis.get("feature_products");
    if (featureProducts) {
      return res.json(JSON.parse(featureProducts));
    }
    featureProducts = await Product.find({ isFeatured: true }).lean();

    if (!featureProducts) {
      return res.status(404).json({ message: "No feature product found" });
    }
    // if feature product found store in redis for quick access
    await redis.set("feature_products", JSON.stringify(featureProducts));
    res.json(featureProducts);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};
export const createProduct = async (req, res) => {
  const { name, description, price,image, category } = req.body;
  console.log("Product Name :",name)
  console.log("Product description :",description)
  // console.log("Product image :",image)
  console.log("Product price :",price)
  console.log("Product category :",category)
  try {
    let cloudinaryResponse = null
    if(image){
        cloudinaryResponse =  await cloudinary.uploader.upload(image,{folder:"products"})
    }
    const product = await Product.create({
        name,
        description,
        category,
        price,
        image:cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : ""
    })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({message:"Server Error",error:error.message})
  }
};
export const deleteProduct = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            throw new apiError(404,"Product Not found")
        }
        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0]//this will give the id of the image
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("Delete image from cloudinary")
            } catch (error) {
                console.log("error deleting image from cloudinary : ",error)
            }
        }
        await Product.findByIdAndDelete(req.params.id)
        res.json({message:"Product deleted SuccessFully"})
    } catch (error) {
        res.stats(500).json({message:"Server Error",error:error.message})
    }
}
export const getRecommendedProduct = async(req,res)=>{
    try {
       const products = await Product.aggregate([
            {$sample:{size:3}},
            {$project:{
                _id:1,
                name:1,
                price:1,
                description:1,
                image:1,
                category:1
            }}
        ])
        res.json(products)
    } catch (error) {
        res.stats(500).json({message:"Server Error",error:error.message})
    }
}
export const getCategoryProduct = async(req,res)=>{
    const{category}=req.params
   try {
    const products = await Product.find({category})
    res.json({products})
   } catch (error) {
    res.stats(500).json({message:"Server Error",error:error.message})
   }
}
export const toggleFeatureProducts = async(req,res)=>{
  try {
      const product = await Product.findById(req.params.id)
      if(product){
          product.isFeatured = !product.isFeatured
          const updateProduct = await product.save()
          await updloadFeatureProdcutCache()
          res.json(updateProduct)
      }
      else{
        res.stats(404).json({message:"No Product found"})
      }
  } catch (error) {
    res.status(500).json({message:"Server Error",error:error.message})
  }
}

async function updloadFeatureProdcutCache() {
    try {
        const featureProducts = await Product.find({isFeatured:true}).lean()
        await redis.set("feature_products", JSON.stringify(featureProducts));
    } catch (error) {
        console.log("Error in upldaod feature product")
    }
}