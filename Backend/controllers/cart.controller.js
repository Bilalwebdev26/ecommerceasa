import { Product } from "../models/Product.model.js";

export const addCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const existItem = user.cartItems.find((item) => item.id === productId);
    if (existItem) {
      existItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in add cart controller", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in remove cart controller", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export const updateQuantity = async (req, res) => {
    try {
        const{id:productId} = req.params
        const{quantity} = req.body
        const user = req.user
        const itemExist = user.cartItems.find((item)=>item.id === productId)
        if(itemExist){
            if(quantity === 0){
                user.cartItems = user.cartItems.filter((item)=> item.id !== productId)
                await user.save()
                return res.json(user.cartItems)
            }
            itemExist.quantity = quantity
            await user.save()
            res.json(user.cartItems)
        }else{
            res.status(404).json({message:"Product not found"})
        }
    } catch (error) {
        console.log("Error in update quan cart controller",error.message)
        res.status(500).json({message:"Internal Server Error",error:error.message})
    }
};
export const getAllCartProducts = async (req, res) => {
    try {
        const products = await Product.find({_id:{$in:req.user.cartItems}})
        //add quantity for each product
        const cartItems = products.map((product)=>{
            const item = req.user.cartItems.find(cartItems => cartItems.id === product.id)
            return{...product.toJSON(),quantity:item.quantity}
        })
        res.json(cartItems)
    } catch (error) {
        console.log("Error in get product cart controller",error.message)
        res.status(500).json({message:"Internal Server Error",error:error.message})
    }
};
