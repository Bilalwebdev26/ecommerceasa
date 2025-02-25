import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore.js";
const GiftCoupon = () => {
  const[userInputCode,setInputCode]=useState('')
  const{coupon,isCouponApplied} = useCartStore()
  const handleApplyCoupon=()=>{
  console.log("")
  }
  return (
    <motion.div 
    className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 shadow-sm sm:p-6 p-4"
    initial={{opacity:0,y:20}}
    animate={{opacity:1,x:0}}
    transition={{duration:0.5,delay:0.3}}
    >
    <div className="space-y-4">
      <div className="">
        <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-300">Do you have a voucher or GIFT card?</label>
        <input 
        type="text"
        id="voucher"
        placeholder="Enter Coupon Code Here"
        value={userInputCode}
        onChange={(e)=>{setInputCode(e.target.value)}}
        required
        className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500 outline-none"
        />
      </div>
      <motion.button
      type="button"
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      onClick={handleApplyCoupon}
      className="flex w-full bg-emerald-600 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        Apply Code
      </motion.button>
    </div>
    {coupon && (
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-300">Applied Coupon</h3>
        <p className="mt-2 text-sm text-gray-400">{coupon.code} - {coupon.discountPercent}%off</p>
        <motion.button
        className="mt-2 flex w-full items-center justify-center bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        type="button"
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        onClick={handleApplyCoupon}
        >
          Remove Coupon
        </motion.button>
      </div>
    )}
    </motion.div>
  );
};

export default GiftCoupon;
